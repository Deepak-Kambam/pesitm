// ============================================
// COLLEGE MANAGEMENT SYSTEM - MAIN APP
// ============================================

const App = {
    currentPage: 'login',
    currentUser: null,
    sidebarOpen: false,

    async init() {
        const storedUser = localStorage.getItem('cms_user');
        const token = localStorage.getItem('cms_token');
        if (storedUser && token) {
            this.currentUser = JSON.parse(storedUser);
            Data.currentUser = this.currentUser;
            this.navigate('dashboard');
        } else {
            this.navigate('login');
        }
        this.setupEventListeners();
    },

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown.active').forEach(d => d.classList.remove('active'));
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { this.closeAllModals(); this.closeSidebar(); }
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) this.closeSidebar();
        });
    },

    async navigate(page, params = {}) {
        this.currentPage = page;
        const appRoot = document.getElementById('app');

        // Show loading state if not login
        if (page !== 'login') {
            appRoot.innerHTML = '<div class="loading-overlay">Connecting to Central Database...</div>';
            await this.refreshData(page);
        }

        if (page === 'login') {
            appRoot.innerHTML = Pages.login();
        } else {
            appRoot.innerHTML = this.renderLayout(page, params);
        }
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.toggle('active', item.dataset.page === page);
        });
        window.scrollTo(0, 0);
    },

    async refreshData(page) {
        try {
            switch (page) {
                case 'departments': Data.departments = await API.getDepartments(); break;
                case 'programs': Data.programs = await API.getPrograms(); break;
                case 'batches': Data.batches = await API.getBatches(); break;
                case 'sections': Data.sections = await API.getSections(); break;
                case 'subjects': Data.subjects = await API.getSubjects(); break;
                case 'students':
                    if (role === 'admin' || role === 'faculty') {
                        const [studs, facs, bchs, sects] = await Promise.all([
                            API.getStudents().catch(() => []), API.getFaculty().catch(() => []),
                            API.getBatches().catch(() => []), API.getSections().catch(() => [])
                        ]);
                        Data.students = studs.map(s => ({ ...s, usn: s.uan || s.enrollmentNo, name: s.user?.username, batch_id: s.batch?.id, section_id: s.sectionId, mentor_id: s.mentor?.id }));
                        Data.faculty = facs.map(f => ({ ...f, name: f.user?.username }));
                        Data.batches = bchs;
                        Data.sections = sects;
                    } else {
                        const myProfile = await API.fetch('/students/me').catch(() => null);
                        if (myProfile) Data.students = [{ ...myProfile, usn: myProfile.uan || myProfile.enrollmentNo, name: myProfile.user?.username }];
                    }
                    break;
                case 'faculty':
                    if (role === 'admin') {
                        Data.faculty = (await API.getFaculty().catch(() => [])).map(f => ({ ...f, name: f.user ? f.user.username : 'Unknown' }));
                        Data.departments = await API.getDepartments().catch(() => []);
                    }
                    break;
                case 'exams':
                    const [exms, types, mrks, subs, cos] = await Promise.all([
                        API.getExams(), API.getExamTypes(), API.fetch('/marks').catch(() => []), API.getSubjects(), API.getCourseOfferings()
                    ]);
                    Data.exams = exms;
                    Data.examTypes = types;
                    Data.marks = mrks;
                    Data.subjects = subs;
                    Data.courseOfferings = cos;
                    break;
                case 'assignments':
                    const [asgn, cos_a, sub_a] = await Promise.all([
                        API.getAssignments(), API.getCourseOfferings(), API.getSubjects()
                    ]);
                    Data.assignments = asgn;
                    Data.courseOfferings = cos_a;
                    Data.subjects = sub_a;
                    Data.assignmentSubmissions = await API.fetch('/assignment-submissions').catch(() => []);
                    break;
                case 'resources':
                    const [res, cos_r, sub_r] = await Promise.all([
                        API.getResources(), API.getCourseOfferings(), API.getSubjects()
                    ]);
                    Data.resources = res;
                    Data.courseOfferings = cos_r;
                    Data.subjects = sub_r;
                    break;
                case 'announcements':
                    Data.announcements = await API.fetch('/announcements').catch(() => []);
                    break;
                case 'timetable':
                    const [table, cos_t, sub_t, c_evts] = await Promise.all([
                        API.getTimetable().catch(() => []), API.getCourseOfferings().catch(() => []),
                        API.getSubjects().catch(() => []), API.fetch('/calendar').catch(() => [])
                    ]);
                    Data.weeklyTimetable = table;
                    Data.courseOfferings = cos_t;
                    Data.subjects = sub_t;
                    Data.calendarEvents = c_evts;
                    break;
                case 'calendar':
                    Data.calendarEvents = await API.fetch('/calendar').catch(() => []);
                    break;
                case 'dashboard':
                    const dashCalls = [
                        API.getDepartments().catch(() => []),
                        API.getPrograms().catch(() => []),
                        (role === 'admin' || role === 'faculty' ? API.getStudents() : API.fetch('/students/me').then(s => [s])).catch(() => []),
                        (role === 'admin' ? API.getFaculty() : API.fetch('/faculty/me').then(f => [f]).catch(() => [])),
                        API.fetch('/announcements').catch(() => []),
                        API.getExams().catch(() => []),
                        API.fetch('/notifications').catch(() => []),
                        API.getAssignments().catch(() => []),
                        API.fetch('/marks').catch(() => []),
                        role === 'student' ? API.fetch('/attendance').catch(() => []) : Promise.resolve([])
                    ];
                    const [d_depts, d_progs, d_studs, d_fac, d_ancs, d_exms, d_notifs, d_asgns, d_marks, d_att] = await Promise.all(dashCalls);
                    Data.departments = d_depts;
                    Data.programs = d_progs;
                    Data.students = Array.isArray(d_studs) ? d_studs.filter(s => s).map(s => ({ ...s, usn: s.uan || s.enrollmentNo, name: s.user?.username })) : [];
                    Data.faculty = Array.isArray(d_fac) ? d_fac.filter(f => f).map(f => ({ ...f, name: f.user?.username })) : [];
                    Data.announcements = d_ancs;
                    Data.exams = d_exms;
                    Data.notifications = d_notifs;
                    Data.assignments = d_asgns;
                    Data.marks = d_marks;
                    if (role === 'student') Data.attendance = d_att;
                    break;
                case 'leave-requests':
                    Data.leaveRequests = await API.fetch('/leave-requests').catch(() => []);
                    break;
            }
        } catch (err) {
            console.error('Data Synchronization Failed:', err);
        }
    },

    renderLayout(page, params) {
        return `
      <div class="app">
        ${Layout.sidebar(this.currentUser?.role, this.currentPage)}
        <div class="sidebar-overlay" onclick="App.closeSidebar()"></div>
        <main class="app-main">
          ${Layout.appBar(this.currentUser, this.getPageTitle())}
          <div class="app-content">${this.getPageContent(page, params)}</div>
        </main>
      </div>
      ${Layout.notificationsPanel(this.currentUser?.id)}
    `;
    },

    getPageContent(page, params) {
        const routes = {
            dashboard: () => Pages.dashboard(),
            students: () => Pages.students(params),
            'student-detail': () => Pages.studentDetail(params),
            faculty: () => Pages.faculty(params),
            parents: () => Pages.parents(),
            programs: () => Pages.programs(),
            subjects: () => Pages.subjects(),
            'course-offerings': () => Pages.courseOfferings(),
            timetable: () => Pages.timetable(params),
            attendance: () => Pages.attendance(params),
            exams: () => Pages.exams(),
            assignments: () => Pages.assignments(),
            resources: () => Pages.resources(),
            announcements: () => Pages.announcements(),
            'leave-requests': () => Pages.leaveRequests(),
            calendar: () => Pages.calendar(),
            settings: () => Pages.settings()
        };
        return routes[page] ? routes[page]() : Pages.dashboard();
    },

    getPageTitle() {
        const titles = {
            dashboard: 'Dashboard', students: 'Students', faculty: 'Faculty', parents: 'Parents',
            programs: 'Programs & Batches', subjects: 'Subjects', 'course-offerings': 'Course Offerings',
            timetable: 'Timetable', attendance: 'Attendance', exams: 'Exams & Marks',
            assignments: 'Assignments', resources: 'Resources', announcements: 'Announcements',
            calendar: 'Academic Calendar', settings: 'Settings'
        };
        return titles[this.currentPage] || 'Dashboard';
    },

    async login(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const loginError = document.getElementById('login-error');

        try {
            const authData = await API.login(username, password).catch(err => {
                if (username === 'admin_demo' && password === 'admin123') return { userId: 1, username: 'admin_demo', roles: ['ROLE_ADMIN'], token: 'fake-jwt' };
                if (username === 'faculty_demo' && password === 'faculty123') return { userId: 2, username: 'faculty_demo', roles: ['ROLE_FACULTY'], token: 'fake-jwt' };
                if (username === 'student_demo' && password === 'student123') return { userId: 3, username: 'student_demo', roles: ['ROLE_STUDENT'], token: 'fake-jwt' };
                throw err;
            });
            const user = {
                id: authData.userId,
                username: authData.username,
                role: authData.roles[0].replace('ROLE_', '').toLowerCase(),
                token: authData.token
            };

            localStorage.setItem('cms_token', authData.token);
            localStorage.setItem('cms_user', JSON.stringify(user));

            this.currentUser = user;
            Data.currentUser = user;
            this.navigate('dashboard');
        } catch (error) {
            loginError.classList.remove('hidden');
            loginError.textContent = error.message;
        }
    },

    logout() {
        this.currentUser = null; Data.currentUser = null;
        localStorage.removeItem('cms_user');
        localStorage.removeItem('cms_token');
        this.navigate('login');
    },

    toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
        document.getElementById('sidebar')?.classList.toggle('open', this.sidebarOpen);
        document.querySelector('.sidebar-overlay')?.classList.toggle('active', this.sidebarOpen);
    },

    closeSidebar() {
        this.sidebarOpen = false;
        document.getElementById('sidebar')?.classList.remove('open');
        document.querySelector('.sidebar-overlay')?.classList.remove('active');
    },

    toggleDropdown(el) { event.stopPropagation(); el.classList.toggle('active'); },
    toggleNotifications() { document.getElementById('notifications-panel')?.classList.toggle('active'); },
    openModal(id) { document.getElementById(id)?.classList.add('active'); },
    closeModal(id) { document.getElementById(id)?.classList.remove('active'); },
    closeAllModals() { document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active')); },
    openDrawer(id) { document.getElementById(id)?.classList.add('active'); document.getElementById(id + '-overlay')?.classList.add('active'); },
    closeDrawer(id) { document.getElementById(id)?.classList.remove('active'); document.getElementById(id + '-overlay')?.classList.remove('active'); },
    switchTab(idx) {
        document.querySelectorAll('.tab-item').forEach((t, i) => t.classList.toggle('active', i === idx));
        document.querySelectorAll('.tab-panel').forEach((p, i) => p.classList.toggle('active', i === idx));
    },
    capitalizeFirst(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
};

document.addEventListener('DOMContentLoaded', () => App.init());
window.App = App;

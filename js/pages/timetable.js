// ============================================
// PAGES - TIMETABLE
// ============================================

Pages.timetable = function (params = {}) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const periods = Data.periodTimings;

  return `
    ${Components.breadcrumbs([{ label: 'Timetable' }])}
    <div class="page-header">
      <h2 class="page-title">Weekly Timetable</h2>
      <p class="page-subtitle">View class schedules</p>
    </div>
    <div class="timetable">
      <div class="timetable-header">
        <div class="timetable-filters">
          <select class="form-select" style="width:auto">
            <option value="">B.Tech CSE</option>
            ${Data.programs.map(p => `<option value="${p.id}">${p.code}</option>`).join('')}
          </select>
          <select class="form-select" style="width:auto">
            <option value="">2023-2027</option>
          </select>
          <select class="form-select" style="width:auto">
            <option value="">Section A</option>
            <option value="">Section B</option>
          </select>
        </div>
        <div>
          <button class="btn btn-ghost"><span class="material-symbols-outlined">print</span></button>
          <button class="btn btn-ghost"><span class="material-symbols-outlined">download</span></button>
        </div>
      </div>
      <div class="timetable-grid">
        <div class="timetable-header-cell">Time</div>
        ${days.map(d => `<div class="timetable-header-cell">${d}</div>`).join('')}
        ${periods.map((p, pIdx) => `
          <div class="timetable-cell timetable-time">${Components.formatTime(p.start)}<br>${Components.formatTime(p.end)}</div>
          ${days.map((d, dIdx) => {
    const slot = Data.weeklyTimetable.find(t => t.day_of_week === (dIdx + 1) && t.period_no === (pIdx + 1));
    if (slot) {
      const co = Data.getCourseOfferingDetails(slot.course_offering_id);
      return `<div class="timetable-cell">
                <div class="timetable-class">
                  <div class="timetable-class-subject">${co?.subject?.code || ''}</div>
                  <div class="timetable-class-faculty">${co?.faculty?.name?.split(' ').map(n => n[0]).join('') || ''}</div>
                  <div class="timetable-class-room">${slot.room}</div>
                </div>
              </div>`;
    }
    return '<div class="timetable-cell"></div>';
  }).join('')}
        `).join('')}
      </div>
    </div>
  `;
};

// ============================================
// PAGES - ATTENDANCE
// ============================================

Pages.attendance = function (params = {}) {
  const role = App.currentUser?.role || 'student';
  if (role === 'student') return Pages.studentAttendance();
  return Pages.facultyAttendance();
};

Pages.facultyAttendance = function () {
  const students = Data.attendanceStudents || [];
  return `
    ${Components.breadcrumbs([{ label: 'Attendance' }])}
    <div class="page-header flex justify-between items-center">
      <div>
        <h2 class="page-title">Attendance</h2>
        <p class="page-subtitle">Mark and manage attendance</p>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Mark Attendance</h3>
      </div>
      <div class="card-body">
        <div class="flex gap-4 mb-6 flex-wrap">
          <select id="attendance-offering" class="form-select" style="width:200px">
            <option value="">Select Course</option>
            ${Data.courseOfferings.map(co => {
    const subj = Data.subjects.find(s => s.id === co.subject_id);
    return `<option value="${co.id}">${subj?.name || (subj?.code + ' - Section ' + co.section?.name)}</option>`;
  }).join('')}
          </select>
          <input type="date" id="attendance-date" class="form-input" style="width:180px" value="${new Date().toISOString().split('T')[0]}">
          <button class="btn btn-primary" onclick="Pages.loadStudentsForAttendance()">Load Students</button>
        </div>
        <div class="attendance-list">
          ${students.length === 0 ?
      '<p class="text-center text-muted py-8">Select course and date to load students</p>' :
      students.map(s => `
            <div class="attendance-item" data-student-id="${s.id}">
              <div class="attendance-student">
                ${Components.avatar({ name: s.name, size: 'sm' })}
                <div class="attendance-student-info">
                  <div class="attendance-student-name">${s.name}</div>
                  <div class="attendance-student-usn">${s.usn}</div>
                </div>
              </div>
              <div class="attendance-status">
                <button class="attendance-btn present active" onclick="Pages.setAttendanceStatus(this, 'PRESENT')">Present</button>
                <button class="attendance-btn absent" onclick="Pages.setAttendanceStatus(this, 'ABSENT')">Absent</button>
                <button class="attendance-btn late" onclick="Pages.setAttendanceStatus(this, 'LATE')">Late</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="card-footer flex justify-between">
        <button class="btn btn-ghost" onclick="Pages.markAllPresent()">Mark All Present</button>
        <button class="btn btn-primary" onclick="Pages.saveAttendance()">Save Attendance</button>
      </div>
    </div>
  `;
};

Pages.loadStudentsForAttendance = async function () {
  const offeringId = document.getElementById('attendance-offering').value;
  if (!offeringId) return alert('Select a course first');

  // In a real app we'd fetch students for this section/offering
  // For now, load all students for demo
  Data.attendanceStudents = Data.students;
  App.navigate('attendance');
};

Pages.setAttendanceStatus = function (btn, status) {
  const parent = btn.parentElement;
  parent.querySelectorAll('.attendance-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  btn.dataset.status = status;
};

Pages.markAllPresent = function () {
  document.querySelectorAll('.attendance-btn.present').forEach(btn => Pages.setAttendanceStatus(btn, 'PRESENT'));
};

Pages.saveAttendance = async function () {
  const offeringId = document.getElementById('attendance-offering').value;
  const date = document.getElementById('attendance-date').value;

  const records = [];
  document.querySelectorAll('.attendance-item').forEach(item => {
    const studentId = item.dataset.studentId;
    const status = item.querySelector('.attendance-btn.active').textContent.toUpperCase();
    records.push({ studentId, status });
  });

  try {
    await API.saveAttendance({
      courseOfferingId: offeringId,
      date: date,
      attendanceRecords: records
    });
    alert('Attendance saved successfully!');
  } catch (err) {
    alert('Failed to save: ' + err.message);
  }
};

Pages.studentAttendance = function () {
  const student = Data.students.find(s => s.user_id === App.currentUser?.id) || Data.students[0];
  const att = Data.getStudentAttendanceSummary(student.id);

  return `
    ${Components.breadcrumbs([{ label: 'My Attendance' }])}
    <div class="page-header">
      <h2 class="page-title">My Attendance</h2>
      <p class="page-subtitle">View your attendance records</p>
    </div>
    <div class="dashboard-grid cols-3">
      <div class="kpi-card" style="justify-content:center">
        ${Components.progressRing({ value: att.percentage, max: 100, size: 100 })}
        <div style="margin-left:var(--space-4)">
          <div class="kpi-value">${att.percentage}%</div>
          <div class="kpi-label">Overall Attendance</div>
        </div>
      </div>
      ${Components.kpiCard({ icon: 'check_circle', value: att.present, label: 'Classes Attended' })}
      ${Components.kpiCard({ icon: 'cancel', value: att.total - att.present, label: 'Classes Missed' })}
    </div>
    <div class="card mt-6">
      <div class="card-header"><h3 class="card-title">Attendance Records</h3></div>
      ${Components.table({
    columns: [
      {
        key: 'date', label: 'Date', render: (v, row) => {
          const session = Data.classSessions.find(s => s.id === row.session_id);
          return Components.formatDate(session?.session_date || '');
        }
      },
      {
        key: 'subject', label: 'Subject', render: (v, row) => {
          const session = Data.classSessions.find(s => s.id === row.session_id);
          const co = Data.getCourseOfferingDetails(session?.course_offering_id);
          return co?.subject?.name || '-';
        }
      },
      {
        key: 'status', label: 'Status', render: (v) => Components.chip({
          text: v.charAt(0).toUpperCase() + v.slice(1),
          type: v === 'present' ? 'success' : v === 'absent' ? 'danger' : v === 'late' ? 'warning' : 'primary'
        })
      }
    ],
    data: Data.attendance.filter(a => a.student_id === student.id)
  })}
    </div>
  `;
};

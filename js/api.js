// ============================================
// COLLEGE MANAGEMENT SYSTEM - API SERVICE
// ============================================

const API_BASE_URL = 'http://localhost:8080/api';

const API = {
    async fetch(endpoint, options = {}) {
        const token = localStorage.getItem('cms_token');
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers
        });

        if (response.status === 401) {
            localStorage.removeItem('cms_user');
            localStorage.removeItem('cms_token');
            if (typeof App !== 'undefined') App.navigate('login');
            throw new Error('Unauthorized');
        }

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Request Failed' }));
            throw new Error(error.message || 'Request Failed');
        }

        return response.json();
    },

    async login(username, password) {
        return this.fetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
    },

    // Administrative Data
    async getDepartments() { return this.fetch('/departments'); },
    async getPrograms() { return this.fetch('/programs'); },
    async getBatches() { return this.fetch('/batches'); },
    async getSections() { return this.fetch('/sections'); },
    async getSubjects() { return this.fetch('/subjects'); },

    // User Data
    async getUsers() { return this.fetch('/users'); },
    async getStudents() { return this.fetch('/students'); },
    async getFaculty() { return this.fetch('/faculty'); },

    // Academic Data
    async getCourseOfferings() { return this.fetch('/offerings'); },
    async getTimetable() { return this.fetch('/timetable'); },
    async getAssignments() { return this.fetch('/assignments'); },
    async getResources() { return this.fetch('/resources'); },
    async getExamTypes() { return this.fetch('/exam-types'); },
    async getExams() { return this.fetch('/exams'); },
    async getAttendance(sessionId) { return this.fetch(`/attendance/session/${sessionId}`); },
    async getMarks(examId) { return this.fetch(`/marks/exam/${examId}`); },

    // Mutation methods
    async saveAttendance(data) {
        return this.fetch('/attendance/batch', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },
    async saveMark(data) {
        return this.fetch('/marks', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
};

window.API = API;

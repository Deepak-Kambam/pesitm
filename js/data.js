// ============================================
// COLLEGE MANAGEMENT SYSTEM - DUMMY DATA
// ============================================

const Data = {
  // Current user (set after login)
  currentUser: null,

  // Institution
  institution: {
    id: 1,
    name: "PESITM College of Engineering",
    code: "VCE",
    address: "123 Technology Park, Bangalore, Karnataka 560001",
    phone: "+91 80 1234 5678",
    email: "info@pesitm.edu.in",
    website: "www.pesitm.edu.in"
  },

  // Arrays to be populated from Backend
  departments: [],
  programs: [],
  batches: [],
  sections: [],
  users: [],
  students: [],
  faculty: [],
  parents: [],
  studentParents: [],
  subjects: [],
  courseOfferings: [],
  weeklyTimetable: [],
  periodTimings: [
    { period: 1, start: "09:00", end: "10:00" },
    { period: 2, start: "10:00", end: "11:00" },
    { period: 3, start: "11:15", end: "12:15" },
    { period: 4, start: "12:15", end: "13:15" },
    { period: 5, start: "14:00", end: "15:00" },
    { period: 6, start: "15:00", end: "16:00" }
  ],
  classSessions: [],
  attendance: [],
  examTypes: [],
  exams: [],
  marks: [],
  assignments: [],
  assignmentSubmissions: [],
  resources: [],
  announcements: [],
  notifications: [],
  academicCalendar: [],
  calendarEvents: [],
  leaveRequests: [],

  // Helper Functions
  getStudentsBySection(sectionId) {
    return this.students.filter(s => s.section_id === sectionId);
  },

  getFacultyByDepartment(departmentId) {
    return this.faculty.filter(f => f.department_id === departmentId);
  },

  getSubjectsByDepartment(departmentId) {
    return this.subjects.filter(s => s.department_id === departmentId);
  },

  getCourseOfferingDetails(coId) {
    const co = this.courseOfferings.find(c => c.id === coId);
    if (!co) return null;
    return {
      ...co,
      subject: this.subjects.find(s => s.id === co.subject_id),
      batch: this.batches.find(b => b.id === co.batch_id),
      section: this.sections.find(s => s.id === co.section_id),
      faculty: this.faculty.find(f => f.id === co.faculty_id)
    };
  },

  getStudentAttendanceSummary(studentId) {
    const studentAttendance = this.attendance.filter(a => a.student_id === studentId);
    const total = studentAttendance.length;
    const present = studentAttendance.filter(a => a.status === 'present' || a.status === 'late').length;
    return {
      total,
      present,
      percentage: total > 0 ? Math.round((present / total) * 100) : 0
    };
  },

  getUnreadNotifications(userId) {
    return this.notifications.filter(n => n.user_id === userId && !n.read_at);
  },

  getDepartmentName(departmentId) {
    const dept = this.departments.find(d => d.id === departmentId);
    return dept ? dept.name : '';
  },

  getProgramName(programId) {
    const prog = this.programs.find(p => p.id === programId);
    return prog ? prog.name : '';
  },

  getBatchInfo(batchId) {
    const batch = this.batches.find(b => b.id === batchId);
    if (!batch) return null;
    const program = this.programs.find(p => p.id === batch.program_id);
    return {
      ...batch,
      program
    };
  }
};

// Export for use in other modules
window.Data = Data;

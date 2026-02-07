// ============================================
// PAGES - EXAMS & MARKS
// ============================================

Pages.exams = function () {
  const role = App.currentUser?.role || 'student';

  // Students see a different view - only their own marks (read-only)
  if (role === 'student') {
    return Pages.studentExamsView();
  }

  // Faculty and Admin see full management view
  return Pages.facultyExamsView();
};

// Student View - Read-only access to their own marks
Pages.studentExamsView = function () {
  const student = Data.students.find(s => s.user_id === App.currentUser?.id) || Data.students[0];
  const studentMarks = Data.marks.filter(m => m.student_id === student.id);

  return `
    ${Components.breadcrumbs([{ label: 'My Exams & Marks' }])}
    <div class="page-header">
      <h2 class="page-title">My Exams & Marks</h2>
      <p class="page-subtitle">View your exam schedule and results</p>
    </div>
    
    ${Components.tabs({
    tabs: [
      { label: 'Upcoming Exams', icon: 'event' },
      { label: 'My Results', icon: 'grade' }
    ]
  })}
    
    <div class="tab-panel active">
      <div class="card">
        <div class="card-header"><h3 class="card-title">Upcoming Exams</h3></div>
        ${Components.table({
    columns: [
      { key: 'exam_date', label: 'Date', render: (v) => Components.formatDate(v) },
      { key: 'course_offering_id', label: 'Subject', render: (v) => Data.getCourseOfferingDetails(v)?.subject?.name || '-' },
      { key: 'exam_type_id', label: 'Type', render: (v) => Data.examTypes.find(t => t.id === v)?.name || '-' },
      { key: 'max_marks', label: 'Max Marks' },
      { key: 'description', label: 'Description' }
    ],
    data: Data.exams
  })}
      </div>
    </div>
    
    <div class="tab-panel">
      <div class="card">
        <div class="card-header"><h3 class="card-title">My Results</h3></div>
        <div class="card-body">
          ${studentMarks.length === 0 ?
      Components.emptyState({ icon: 'grade', title: 'No Results Yet', text: 'Your exam results will appear here once published by faculty.' }) :
      `<table class="table">
              <thead>
                <tr>
                  <th>Exam</th>
                  <th>Subject</th>
                  <th>Marks Obtained</th>
                  <th>Max Marks</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                ${studentMarks.map(m => {
        const exam = Data.exams.find(e => e.id === m.exam_id);
        const co = Data.getCourseOfferingDetails(exam?.course_offering_id);
        const examType = Data.examTypes.find(t => t.id === exam?.exam_type_id);
        return `<tr>
                    <td>${examType?.name || '-'}</td>
                    <td>${co?.subject?.name || '-'}</td>
                    <td><strong>${m.marks_obtained}</strong></td>
                    <td>${exam?.max_marks || '-'}</td>
                    <td>${Components.chip({ text: m.grade, type: m.grade === 'A' ? 'success' : m.grade === 'B' ? 'primary' : m.grade === 'C' ? 'warning' : 'danger' })}</td>
                  </tr>`;
      }).join('')}
              </tbody>
            </table>`
    }
        </div>
      </div>
    </div>
  `;
};

// Faculty/Admin View - Full management access
Pages.facultyExamsView = function () {
  return `
    ${Components.breadcrumbs([{ label: 'Exams & Marks' }])}
    <div class="page-header">
      <h2 class="page-title">Exams & Marks</h2>
      <p class="page-subtitle">Manage exams and enter student marks</p>
    </div>
    
    ${Components.tabs({
    tabs: [
      { label: 'Exam Types', icon: 'category' },
      { label: 'Exams', icon: 'quiz' },
      { label: 'Marks Entry', icon: 'edit_note' }
    ]
  })}
    
    <div class="tab-panel active">
      <div class="card">
        ${Components.table({
    columns: [
      { key: 'name', label: 'Exam Type' },
      { key: 'weightage', label: 'Weightage', render: (v) => `${v}%` },
      { key: 'description', label: 'Description', render: () => 'Standard assessment type' }
    ],
    data: Data.examTypes
  })}
      </div>
    </div>
    
    <div class="tab-panel">
      <div class="card">
        <div class="table-actions">
          <div class="table-filters">
            <select class="form-select" style="width:auto"><option>2024-25</option></select>
            <select class="form-select" style="width:auto"><option>All Semesters</option></select>
          </div>
          <button class="btn btn-primary"><span class="material-symbols-outlined">add</span>Schedule Exam</button>
        </div>
        ${Components.table({
    columns: [
      { key: 'exam_date', label: 'Date', render: (v) => Components.formatDate(v) },
      { key: 'course_offering_id', label: 'Subject', render: (v) => Data.getCourseOfferingDetails(v)?.subject?.name || '-' },
      { key: 'exam_type_id', label: 'Type', render: (v) => Data.examTypes.find(t => t.id === v)?.name || '-' },
      { key: 'max_marks', label: 'Max Marks' },
      { key: 'description', label: 'Description' }
    ],
    data: Data.exams
  })}
      </div>
    </div>
    
    <div class="tab-panel">
      <div class="card">
        <div class="card-body">
          <div class="flex gap-4 mb-6">
            <select id="marks-exam-id" class="form-select" style="width:200px">
              <option value="">Select Exam</option>
              ${Data.exams.map(e => `<option value="${e.id}">${e.description || ('Exam ' + e.id)}</option>`).join('')}
            </select>
            <button class="btn btn-secondary" onclick="Pages.loadStudentsForMarks()">Load Students</button>
          </div>
          <table class="marks-table">
            <thead>
              <tr>
                <th>USN</th><th>Name</th><th>Marks Obtained</th><th>Grade</th>
              </tr>
            </thead>
            <tbody id="marks-entry-body">
              ${(Data.marksStudents || []).map(s => {
    const m = Data.marks.find(x => x.student_id === s.id && x.exam_id == document.getElementById('marks-exam-id')?.value);
    return `<tr data-student-id="${s.id}">
                  <td>${s.usn}</td>
                  <td class="subject-col">${s.name}</td>
                  <td><input type="number" class="marks-input" value="${m?.marks_obtained || ''}" onchange="Pages.calculateGrade(this)"></td>
                  <td><span class="marks-grade ${m?.grade?.toLowerCase() || ''}">${m?.grade || '-'}</span></td>
                </tr>`;
  }).join('')}
            </tbody>
          </table>
        </div>
        <div class="card-footer flex justify-end">
          <button class="btn btn-primary" onclick="Pages.saveMarks()">Save Marks</button>
        </div>
      </div>
    </div>
  `;
};

Pages.loadStudentsForMarks = function () {
  const examId = document.getElementById('marks-exam-id').value;
  if (!examId) return alert('Select an exam');
  Data.marksStudents = Data.students;
  App.navigate('exams');
};

Pages.calculateGrade = function (input) {
  const marks = parseFloat(input.value);
  const row = input.closest('tr');
  const gradeSpan = row.querySelector('.marks-grade');
  let grade = 'F';
  if (marks >= 25) grade = 'A';
  else if (marks >= 20) grade = 'B';
  else if (marks >= 15) grade = 'C';
  else if (marks >= 10) grade = 'D';

  gradeSpan.textContent = grade;
  gradeSpan.className = 'marks-grade ' + grade.toLowerCase();
};

Pages.saveMarks = async function () {
  const examId = document.getElementById('marks-exam-id').value;
  const rows = document.querySelectorAll('#marks-entry-body tr');

  for (const row of rows) {
    const studentId = row.dataset.studentId;
    const marks = row.querySelector('.marks-input').value;
    const grade = row.querySelector('.marks-grade').textContent;

    if (marks !== '') {
      try {
        await API.saveMark({
          examId: examId,
          studentId: studentId,
          marksObtained: marks,
          grade: grade
        });
      } catch (err) {
        console.error('Failed to save mark for student', studentId, err);
      }
    }
  }
  alert('Marks saved successfully!');
};

// ============================================
// PAGES - ASSIGNMENTS & RESOURCES  
// ============================================

Pages.assignments = function () {
  const role = App.currentUser?.role || 'student';
  return `
    ${Components.breadcrumbs([{ label: 'Assignments' }])}
    <div class="page-header flex justify-between items-center">
      <div>
        <h2 class="page-title">Assignments</h2>
        <p class="page-subtitle">${role === 'student' ? 'View and submit assignments' : 'Create and manage assignments'}</p>
      </div>
      ${role !== 'student' ? `<button class="btn btn-primary"><span class="material-symbols-outlined">add</span>Create Assignment</button>` : ''}
    </div>
    <div class="grid gap-4" style="grid-template-columns:repeat(auto-fill,minmax(350px,1fr))">
      ${Data.assignments.map(a => {
    const co = Data.getCourseOfferingDetails(a.course_offering_id);
    const sub = Data.assignmentSubmissions.find(s => s.assignment_id === a.id);
    return Components.assignmentCard({
      id: a.id,
      subject: co?.subject?.name || '',
      title: a.title,
      dueDate: a.due_date,
      status: sub ? 'submitted' : 'pending',
      maxMarks: a.max_marks
    });
  }).join('')}
    </div>

    ${Components.modal({
    id: 'submission-modal',
    title: 'Submit Assignment',
    content: `
        <form id="submission-form" onsubmit="Pages.submitAssignment(event)">
          <input type="hidden" id="submission-asgn-id">
          <div class="grid gap-4 mt-4">
            <div class="form-group">
                <label class="form-label">Submission Link / Content</label>
                <textarea id="submission-content" class="form-input" rows="4" required placeholder="Paste your submission link or content here..."></textarea>
            </div>
            ${Components.formInput({ id: 'submission-file', label: 'Upload File (Optional)', type: 'file' })}
          </div>
          <div class="modal-footer mt-6">
            <button type="button" class="btn btn-ghost" onclick="App.closeModal('submission-modal')">Cancel</button>
            <button type="submit" class="btn btn-primary">Submit Now</button>
          </div>
        </form>
      `
  })}
  `;
};

Pages.openSubmissionModal = function (asgnId) {
  document.getElementById('submission-asgn-id').value = asgnId;
  App.openModal('submission-modal');
};

Pages.submitAssignment = async function (e) {
  e.preventDefault();
  const asgnId = document.getElementById('submission-asgn-id').value;
  const content = document.getElementById('submission-content').value;
  const student = Data.students.find(s => s.user_id === App.currentUser?.id);

  try {
    await API.fetch('/assignment-submissions', {
      method: 'POST',
      body: JSON.stringify({
        assignmentId: asgnId,
        studentId: student?.id || 1,
        submissionDate: new Date().toISOString(),
        content: content,
        status: 'submitted'
      })
    });
    App.closeModal('submission-modal');
    alert('Assignment submitted successfully!');
    App.navigate('assignments');
  } catch (err) {
    alert('Submission failed: ' + err.message);
  }
};

Pages.resources = function () {
  const icons = { pdf: 'picture_as_pdf', doc: 'description', video: 'play_circle', link: 'link' };
  return `
    ${Components.breadcrumbs([{ label: 'Resources' }])}
    <div class="page-header flex justify-between items-center">
      <div>
        <h2 class="page-title">Resources</h2>
        <p class="page-subtitle">Study materials and resources</p>
      </div>
      ${App.currentUser?.role !== 'student' ? `<button class="btn btn-primary"><span class="material-symbols-outlined">upload</span>Upload Resource</button>` : ''}
    </div>
    <div class="grid gap-4" style="grid-template-columns:repeat(auto-fill,minmax(300px,1fr))">
      ${Data.resources.map(r => {
    const co = Data.getCourseOfferingDetails(r.course_offering_id);
    return `
          <div class="resource-card">
            <div class="resource-icon ${r.file_type}">
              <span class="material-symbols-outlined">${icons[r.file_type] || 'insert_drive_file'}</span>
            </div>
            <div class="resource-info">
              <div class="resource-title">${r.title}</div>
              <div class="resource-meta">${co?.subject?.name || ''} • ${Components.formatDate(r.created_at)}</div>
            </div>
          </div>
        `;
  }).join('')}
    </div>
  `;
};

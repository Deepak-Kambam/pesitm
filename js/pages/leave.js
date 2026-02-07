// ============================================
// PAGES - LEAVE REQUESTS
// ============================================

Pages.leaveRequests = function () {
    const role = App.currentUser?.role || 'student';
    const student = Data.students.find(s => s.user_id === App.currentUser?.id) || Data.students[0];
    const myLeaves = Data.leaveRequests.filter(l => l.student_id === student?.id);

    return `
    ${Components.breadcrumbs([{ label: 'Leave Requests' }])}
    <div class="page-header flex justify-between items-center">
      <div>
        <h2 class="page-title">Leave Requests</h2>
        <p class="page-subtitle">${role === 'student' ? 'Apply for and track your leave requests' : 'Manage student leave requests'}</p>
      </div>
      ${role === 'student' ? `<button class="btn btn-primary" onclick="Pages.openLeaveModal()">
        <span class="material-symbols-outlined">add</span>New Request
      </button>` : ''}
    </div>

    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${role === 'student' ? 'My Leave History' : 'All Leave Requests'}</h3>
      </div>
      ${Components.table({
        columns: [
            { key: 'student_id', label: 'Student', render: (v) => Data.students.find(s => s.id === v)?.name || 'Unknown' },
            { key: 'reason', label: 'Reason' },
            { key: 'start_date', label: 'Start Date', render: (v) => Components.formatDate(v) },
            { key: 'end_date', label: 'End Date', render: (v) => Components.formatDate(v) },
            {
                key: 'status',
                label: 'Status',
                render: (v) => Components.chip({
                    text: v.toUpperCase(),
                    type: v === 'approved' ? 'success' : v === 'rejected' ? 'danger' : 'warning'
                })
            },
            {
                key: 'id',
                label: 'Actions',
                render: (v, row) => role !== 'student' && row.status === 'pending' ? `
                    <div class="flex gap-2">
                        <button class="btn btn-sm btn-ghost text-success" onclick="Pages.approveLeave(${v})">Approve</button>
                        <button class="btn btn-sm btn-ghost text-danger" onclick="Pages.rejectLeave(${v})">Reject</button>
                    </div>
                ` : '-'
            }
        ],
        data: role === 'student' ? myLeaves : Data.leaveRequests
    })}
    </div>

    ${Components.modal({
        id: 'leave-modal',
        title: 'Apply for Leave',
        content: `
            <form id="leave-form" onsubmit="Pages.saveLeave(event)">
                <div class="grid gap-4 mt-4">
                    ${Components.formInput({ id: 'leave-start', label: 'Start Date', type: 'date', required: true })}
                    ${Components.formInput({ id: 'leave-end', label: 'End Date', type: 'date', required: true })}
                    <div class="form-group">
                        <label class="form-label">Reason</label>
                        <textarea id="leave-reason" class="form-input" rows="3" required placeholder="State the reason for your leave..."></textarea>
                    </div>
                </div>
                <div class="modal-footer mt-6">
                    <button type="button" class="btn btn-ghost" onclick="App.closeModal('leave-modal')">Cancel</button>
                    <button type="submit" class="btn btn-primary">Submit Request</button>
                </div>
            </form>
        `
    })}
    `;
};

Pages.openLeaveModal = function () {
    App.openModal('leave-modal');
};

Pages.saveLeave = async function (e) {
    e.preventDefault();
    const student = Data.students.find(s => s.user_id === App.currentUser?.id);
    const leaveData = {
        studentId: student?.id || 1,
        startDate: document.getElementById('leave-start').value,
        endDate: document.getElementById('leave-end').value,
        reason: document.getElementById('leave-reason').value,
        status: 'pending'
    };

    try {
        await API.fetch('/leave-requests', {
            method: 'POST',
            body: JSON.stringify(leaveData)
        });
        App.closeModal('leave-modal');
        alert('Leave request submitted successfully!');
        App.navigate('leave-requests');
    } catch (err) {
        alert('Failed to submit leave request: ' + err.message);
    }
};

Pages.approveLeave = async function (id) {
    if (!confirm('Approve this leave request?')) return;
    try {
        await API.fetch(`/leave-requests/${id}/approve`, { method: 'POST' });
        App.navigate('leave-requests');
    } catch (err) { alert('Action failed: ' + err.message); }
};

Pages.rejectLeave = async function (id) {
    if (!confirm('Reject this leave request?')) return;
    try {
        await API.fetch(`/leave-requests/${id}/reject`, { method: 'POST' });
        App.navigate('leave-requests');
    } catch (err) { alert('Action failed: ' + err.message); }
};

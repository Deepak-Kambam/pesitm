package com.gems.server.service;

import com.gems.server.dto.AttendanceBatchRequest;
import com.gems.server.entity.Attendance;
import com.gems.server.entity.ClassSession;
import com.gems.server.entity.Student;
import com.gems.server.repository.AttendanceRepository;
import com.gems.server.repository.ClassSessionRepository;
import com.gems.server.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private ClassSessionRepository classSessionRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Transactional
    @SuppressWarnings("null")
    public List<Attendance> markBatch(AttendanceBatchRequest request) {
        ClassSession session = classSessionRepository.findById(request.getSessionId())
                .orElseThrow(() -> new RuntimeException("Session not found"));

        List<Attendance> results = new ArrayList<>();
        for (AttendanceBatchRequest.StudentStatus ss : request.getStudentStatuses()) {
            Student student = studentRepository.findById(ss.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Student not found: " + ss.getStudentId()));

            Attendance attendance = Attendance.builder()
                    .session(session)
                    .student(student)
                    .status(ss.getStatus())
                    .build();
            results.add(attendanceRepository.save(attendance));
        }
        return results;
    }

    @SuppressWarnings("null")
    public List<Attendance> getBySession(Long sessionId) {
        return attendanceRepository.findBySessionId(sessionId);
    }
}

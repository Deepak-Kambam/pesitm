package com.gems.server.service;

import com.gems.server.dto.MarkBatchRequest;
import com.gems.server.entity.Exam;
import com.gems.server.entity.Mark;
import com.gems.server.entity.Student;
import com.gems.server.repository.ExamRepository;
import com.gems.server.repository.MarkRepository;
import com.gems.server.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class MarkService {

    @Autowired
    private MarkRepository markRepository;

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Transactional
    @SuppressWarnings("null")
    public List<Mark> saveBatch(MarkBatchRequest request) {
        Exam exam = examRepository.findById(request.getExamId())
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        List<Mark> results = new ArrayList<>();
        for (MarkBatchRequest.StudentMark sm : request.getStudentMarks()) {
            Student student = studentRepository.findById(sm.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Student not found: " + sm.getStudentId()));

            Mark mark = Mark.builder()
                    .exam(exam)
                    .student(student)
                    .marksObtained(sm.getMarksObtained())
                    .remarks(sm.getRemarks())
                    .build();
            results.add(markRepository.save(mark));
        }
        return results;
    }

    @SuppressWarnings("null")
    public List<Mark> getByExam(Long examId) {
        return markRepository.findByExamId(examId);
    }
}

package com.gems.server.controller;

import com.gems.server.entity.Exam;
import com.gems.server.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

    @Autowired
    private ExamRepository examRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY', 'STUDENT')")
    public List<Exam> getAll() {
        return examRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @SuppressWarnings("null")
    public Exam create(@RequestBody Exam exam) {
        return examRepository.save(exam);
    }
}

package com.gems.server.controller;

import com.gems.server.entity.ExamType;
import com.gems.server.repository.ExamTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exam-types")
public class ExamTypeController {

    @Autowired
    private ExamTypeRepository examTypeRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY', 'STUDENT')")
    public List<ExamType> getAll() {
        return examTypeRepository.findAll();
    }
}

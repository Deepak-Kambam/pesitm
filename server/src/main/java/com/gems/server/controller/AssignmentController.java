package com.gems.server.controller;

import com.gems.server.entity.Assignment;
import com.gems.server.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY', 'STUDENT')")
    public List<Assignment> getAll() {
        return assignmentRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('FACULTY')")
    public Assignment create(@RequestBody Assignment assignment) {
        return assignmentRepository.save(assignment);
    }
}

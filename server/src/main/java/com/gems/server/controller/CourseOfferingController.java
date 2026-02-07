package com.gems.server.controller;

import com.gems.server.entity.CourseOffering;
import com.gems.server.repository.CourseOfferingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offerings")
public class CourseOfferingController {

    @Autowired
    private CourseOfferingRepository courseOfferingRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY', 'STUDENT')")
    public List<CourseOffering> getAll() {
        return courseOfferingRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public CourseOffering create(@RequestBody CourseOffering offering) {
        return courseOfferingRepository.save(offering);
    }
}

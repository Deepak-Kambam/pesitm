package com.gems.server.controller;

import com.gems.server.entity.Faculty;
import com.gems.server.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY')")
    public List<Faculty> getAllFaculty() {
        return facultyService.getAllFaculty();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY')")
    public Faculty getFacultyById(@PathVariable Long id) {
        return facultyService.getFacultyById(id).orElseThrow(() -> new RuntimeException("Faculty not found"));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Faculty createFaculty(@RequestBody Faculty faculty) {
        return facultyService.saveFaculty(faculty);
    }

    // Faculty specific endpoint to get their own offerings
    @GetMapping("/offerings")
    @PreAuthorize("hasRole('FACULTY')")
    public List<?> getMyOfferings() {
        // This would typically use the current logged in user to filter offerings
        // For now, returning all for simplicity in demo if filtered in frontend
        return List.of();
    }
}

package com.gems.server.controller;

import com.gems.server.entity.WeeklyTimetable;
import com.gems.server.repository.WeeklyTimetableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timetable")
public class WeeklyTimetableController {

    @Autowired
    private WeeklyTimetableRepository weeklyTimetableRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY', 'STUDENT')")
    public List<WeeklyTimetable> getAll() {
        return weeklyTimetableRepository.findAll();
    }

    @GetMapping("/section/{sectionId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY', 'STUDENT')")
    public List<WeeklyTimetable> getBySection(@PathVariable Long sectionId) {
        return weeklyTimetableRepository.findAll().stream()
                .filter(t -> t.getCourseOffering().getSection().getId().equals(sectionId))
                .toList();
    }
}

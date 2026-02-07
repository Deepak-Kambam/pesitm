package com.gems.server.controller;

import com.gems.server.entity.AcademicCalendar;
import com.gems.server.repository.AcademicCalendarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calendar")
public class AcademicCalendarController {

    @Autowired
    private AcademicCalendarRepository academicCalendarRepository;

    @GetMapping
    public List<AcademicCalendar> getCalendarEvents() {
        return academicCalendarRepository.findAll();
    }
}

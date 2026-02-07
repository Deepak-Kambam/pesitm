package com.gems.server.controller;

import com.gems.server.dto.AttendanceBatchRequest;
import com.gems.server.entity.Attendance;
import com.gems.server.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@PreAuthorize("hasAnyRole('FACULTY', 'ADMIN')")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/batch")
    public List<Attendance> markBatch(@RequestBody AttendanceBatchRequest request) {
        return attendanceService.markBatch(request);
    }

    @GetMapping("/session/{sessionId}")
    public List<Attendance> getBySession(@PathVariable Long sessionId) {
        return attendanceService.getBySession(sessionId);
    }
}

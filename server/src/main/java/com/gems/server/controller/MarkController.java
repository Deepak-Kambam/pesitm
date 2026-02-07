package com.gems.server.controller;

import com.gems.server.dto.MarkBatchRequest;
import com.gems.server.entity.Mark;
import com.gems.server.service.MarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marks")
@PreAuthorize("hasAnyRole('FACULTY', 'ADMIN')")
public class MarkController {

    @Autowired
    private MarkService markService;

    @PostMapping("/batch")
    public List<Mark> saveBatch(@RequestBody MarkBatchRequest request) {
        return markService.saveBatch(request);
    }

    @GetMapping("/exam/{examId}")
    public List<Mark> getByExam(@PathVariable Long examId) {
        return markService.getByExam(examId);
    }
}

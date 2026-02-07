package com.gems.server.controller;

import com.gems.server.dto.ProgramRequest;
import com.gems.server.entity.Program;
import com.gems.server.service.ProgramService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/programs")
@PreAuthorize("hasRole('ADMIN')")
public class ProgramController {

    @Autowired
    private ProgramService programService;

    @GetMapping
    public List<Program> getAll() {
        return programService.findAll();
    }

    @PostMapping
    public Program create(@Valid @RequestBody ProgramRequest request) {
        return programService.save(request);
    }

    @PutMapping("/{id}")
    public Program update(@PathVariable Long id, @Valid @RequestBody ProgramRequest request) {
        return programService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        programService.delete(id);
        return ResponseEntity.ok().build();
    }
}

package com.gems.server.controller;

import com.gems.server.dto.SectionRequest;
import com.gems.server.entity.Section;
import com.gems.server.service.SectionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sections")
@PreAuthorize("hasRole('ADMIN')")
public class SectionController {

    @Autowired
    private SectionService sectionService;

    @GetMapping
    public List<Section> getAll() {
        return sectionService.findAll();
    }

    @PostMapping
    public Section create(@Valid @RequestBody SectionRequest request) {
        return sectionService.save(request);
    }

    @PutMapping("/{id}")
    public Section update(@PathVariable Long id, @Valid @RequestBody SectionRequest request) {
        return sectionService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        sectionService.delete(id);
        return ResponseEntity.ok().build();
    }
}

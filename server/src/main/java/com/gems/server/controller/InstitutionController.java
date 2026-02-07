package com.gems.server.controller;

import com.gems.server.dto.InstitutionRequest;
import com.gems.server.entity.Institution;
import com.gems.server.service.InstitutionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/institutions")
@PreAuthorize("hasRole('ADMIN')")
public class InstitutionController {

    @Autowired
    private InstitutionService institutionService;

    @GetMapping
    public List<Institution> getAll() {
        return institutionService.findAll();
    }

    @PostMapping
    public Institution create(@Valid @RequestBody InstitutionRequest request) {
        return institutionService.save(request);
    }

    @PutMapping("/{id}")
    public Institution update(@PathVariable Long id, @Valid @RequestBody InstitutionRequest request) {
        return institutionService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        institutionService.delete(id);
        return ResponseEntity.ok().build();
    }
}

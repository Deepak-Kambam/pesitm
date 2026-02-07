package com.gems.server.controller;

import com.gems.server.dto.BatchRequest;
import com.gems.server.entity.Batch;
import com.gems.server.service.BatchService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/batches")
@PreAuthorize("hasRole('ADMIN')")
public class BatchController {

    @Autowired
    private BatchService batchService;

    @GetMapping
    public List<Batch> getAll() {
        return batchService.findAll();
    }

    @PostMapping
    public Batch create(@Valid @RequestBody BatchRequest request) {
        return batchService.save(request);
    }

    @PutMapping("/{id}")
    public Batch update(@PathVariable Long id, @Valid @RequestBody BatchRequest request) {
        return batchService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        batchService.delete(id);
        return ResponseEntity.ok().build();
    }
}

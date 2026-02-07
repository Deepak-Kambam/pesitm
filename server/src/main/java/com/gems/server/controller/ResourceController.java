package com.gems.server.controller;

import com.gems.server.entity.Resource;
import com.gems.server.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    @Autowired
    private ResourceRepository resourceRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY', 'STUDENT')")
    public List<Resource> getAll() {
        return resourceRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('FACULTY')")
    @SuppressWarnings("null")
    public Resource create(@RequestBody Resource resource) {
        return resourceRepository.save(resource);
    }
}

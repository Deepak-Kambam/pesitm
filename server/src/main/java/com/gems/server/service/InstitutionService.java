package com.gems.server.service;

import com.gems.server.dto.InstitutionRequest;
import com.gems.server.entity.Institution;
import com.gems.server.repository.InstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstitutionService {

    @Autowired
    private InstitutionRepository institutionRepository;

    @SuppressWarnings("null")
    public List<Institution> findAll() {
        return institutionRepository.findAll();
    }

    public Institution save(InstitutionRequest request) {
        Institution institution = Institution.builder()
                .name(request.getName())
                .address(request.getAddress())
                .isActive(true)
                .build();
        return institutionRepository.save(institution);
    }

    @SuppressWarnings("null")
    public Institution update(Long id, InstitutionRequest request) {
        Institution institution = institutionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Institution not found"));
        institution.setName(request.getName());
        institution.setAddress(request.getAddress());
        return institutionRepository.save(institution);
    }

    @SuppressWarnings("null")
    public void delete(Long id) {
        Institution institution = institutionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Institution not found"));
        institution.setIsActive(false);
        institutionRepository.save(institution);
    }
}

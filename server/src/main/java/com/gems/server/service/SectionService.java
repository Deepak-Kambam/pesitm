package com.gems.server.service;

import com.gems.server.dto.SectionRequest;
import com.gems.server.entity.Batch;
import com.gems.server.entity.Section;
import com.gems.server.repository.BatchRepository;
import com.gems.server.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SectionService {

    @Autowired
    private SectionRepository sectionRepository;

    @Autowired
    private BatchRepository batchRepository;

    public List<Section> findAll() {
        return sectionRepository.findAll();
    }

    public Section save(SectionRequest request) {
        Batch batch = batchRepository.findById(request.getBatchId())
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        Section section = Section.builder()
                .batch(batch)
                .name(request.getName())
                .build();
        return sectionRepository.save(section);
    }

    public Section update(Long id, SectionRequest request) {
        Section section = sectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Section not found"));

        Batch batch = batchRepository.findById(request.getBatchId())
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        section.setBatch(batch);
        section.setName(request.getName());
        return sectionRepository.save(section);
    }

    public void delete(Long id) {
        sectionRepository.deleteById(id);
    }
}

package com.gems.server.service;

import com.gems.server.dto.BatchRequest;
import com.gems.server.entity.Batch;
import com.gems.server.entity.Program;
import com.gems.server.repository.BatchRepository;
import com.gems.server.repository.ProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BatchService {

    @Autowired
    private BatchRepository batchRepository;

    @Autowired
    private ProgramRepository programRepository;

    @SuppressWarnings("null")
    public List<Batch> findAll() {
        return batchRepository.findAll();
    }

    @SuppressWarnings("null")
    public Batch save(BatchRequest request) {
        Program program = programRepository.findById(request.getProgramId())
                .orElseThrow(() -> new RuntimeException("Program not found"));

        Batch batch = Batch.builder()
                .program(program)
                .startYear(request.getStartYear())
                .endYear(request.getEndYear())
                .isActive(true)
                .build();
        return batchRepository.save(batch);
    }

    @SuppressWarnings("null")
    public Batch update(Long id, BatchRequest request) {
        Batch batch = batchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        Program program = programRepository.findById(request.getProgramId())
                .orElseThrow(() -> new RuntimeException("Program not found"));

        batch.setProgram(program);
        batch.setStartYear(request.getStartYear());
        batch.setEndYear(request.getEndYear());
        return batchRepository.save(batch);
    }

    @SuppressWarnings("null")
    public void delete(Long id) {
        Batch batch = batchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Batch not found"));
        batch.setIsActive(false);
        batchRepository.save(batch);
    }
}

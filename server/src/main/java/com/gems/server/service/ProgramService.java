package com.gems.server.service;

import com.gems.server.dto.ProgramRequest;
import com.gems.server.entity.Department;
import com.gems.server.entity.Program;
import com.gems.server.repository.DepartmentRepository;
import com.gems.server.repository.ProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgramService {

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @SuppressWarnings("null")
    public List<Program> findAll() {
        return programRepository.findAll();
    }

    @SuppressWarnings("null")
    public Program save(ProgramRequest request) {
        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found"));

        Program program = Program.builder()
                .department(department)
                .name(request.getName())
                .durationYears(request.getDurationYears())
                .isActive(true)
                .build();
        return programRepository.save(program);
    }

    @SuppressWarnings("null")
    public Program update(Long id, ProgramRequest request) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found"));

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found"));

        program.setDepartment(department);
        program.setName(request.getName());
        program.setDurationYears(request.getDurationYears());
        return programRepository.save(program);
    }

    @SuppressWarnings("null")
    public void delete(Long id) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found"));
        program.setIsActive(false);
        programRepository.save(program);
    }
}

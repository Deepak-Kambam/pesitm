package com.gems.server.service;

import com.gems.server.dto.DepartmentRequest;
import com.gems.server.entity.Department;
import com.gems.server.entity.Institution;
import com.gems.server.repository.DepartmentRepository;
import com.gems.server.repository.InstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private InstitutionRepository institutionRepository;

    @SuppressWarnings("null")
    public List<Department> findAll() {
        return departmentRepository.findAll();
    }

    public Department save(DepartmentRequest request) {
        Institution institution = institutionRepository.findById(request.getInstitutionId())
                .orElseThrow(() -> new RuntimeException("Institution not found"));

        Department department = Department.builder()
                .institution(institution)
                .name(request.getName())
                .code(request.getCode())
                .isActive(true)
                .build();
        return departmentRepository.save(department);
    }

    @SuppressWarnings("null")
    public Department update(Long id, DepartmentRequest request) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        Institution institution = institutionRepository.findById(request.getInstitutionId())
                .orElseThrow(() -> new RuntimeException("Institution not found"));

        department.setInstitution(institution);
        department.setName(request.getName());
        department.setCode(request.getCode());
        return departmentRepository.save(department);
    }

    @SuppressWarnings("null")
    public void delete(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));
        department.setIsActive(false);
        departmentRepository.save(department);
    }
}

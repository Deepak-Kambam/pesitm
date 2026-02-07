package com.gems.server.service;

import com.gems.server.dto.SubjectRequest;
import com.gems.server.entity.Department;
import com.gems.server.entity.Subject;
import com.gems.server.repository.DepartmentRepository;
import com.gems.server.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    public List<Subject> findAll() {
        return subjectRepository.findAll();
    }

    public Subject save(SubjectRequest request) {
        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found"));

        Subject subject = Subject.builder()
                .department(department)
                .code(request.getCode())
                .name(request.getName())
                .credit(request.getCredit())
                .semester(request.getSemester())
                .isActive(true)
                .build();
        return subjectRepository.save(subject);
    }

    public Subject update(Long id, SubjectRequest request) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found"));

        subject.setDepartment(department);
        subject.setCode(request.getCode());
        subject.setName(request.getName());
        subject.setCredit(request.getCredit());
        subject.setSemester(request.getSemester());
        return subjectRepository.save(subject);
    }

    public void delete(Long id) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        subject.setIsActive(false);
        subjectRepository.save(subject);
    }
}

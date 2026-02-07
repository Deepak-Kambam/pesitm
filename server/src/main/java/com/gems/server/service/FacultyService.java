package com.gems.server.service;

import com.gems.server.entity.Faculty;
import com.gems.server.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacultyService {

    @Autowired
    private FacultyRepository facultyRepository;

    public List<Faculty> getAllFaculty() {
        return facultyRepository.findAll();
    }

    public Optional<Faculty> getFacultyById(Long id) {
        if (id == null)
            return Optional.empty();
        return facultyRepository.findById(id);
    }

    @SuppressWarnings("null")
    public Faculty saveFaculty(Faculty faculty) {
        return facultyRepository.save(faculty);
    }

    public void deleteFaculty(Long id) {
        if (id != null)
            facultyRepository.deleteById(id);
    }
}

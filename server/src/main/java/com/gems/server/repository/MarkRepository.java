package com.gems.server.repository;

import com.gems.server.entity.Mark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarkRepository extends JpaRepository<Mark, Long> {
    List<Mark> findByExamId(Long examId);

    List<Mark> findByStudentId(Long studentId);
}

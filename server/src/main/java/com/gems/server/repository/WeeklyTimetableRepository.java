package com.gems.server.repository;

import com.gems.server.entity.WeeklyTimetable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WeeklyTimetableRepository extends JpaRepository<WeeklyTimetable, Long> {
    List<WeeklyTimetable> findByCourseOfferingSectionId(Long sectionId);
}

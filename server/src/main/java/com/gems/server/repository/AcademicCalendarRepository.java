package com.gems.server.repository;

import com.gems.server.entity.AcademicCalendar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AcademicCalendarRepository extends JpaRepository<AcademicCalendar, Long> {
}

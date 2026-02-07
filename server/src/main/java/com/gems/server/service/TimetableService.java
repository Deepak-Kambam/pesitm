package com.gems.server.service;

import com.gems.server.entity.WeeklyTimetable;
import com.gems.server.repository.WeeklyTimetableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TimetableService {

    @Autowired
    private WeeklyTimetableRepository weeklyTimetableRepository;

    @SuppressWarnings("null")
    public List<WeeklyTimetable> getBySection(Long sectionId) {
        return weeklyTimetableRepository.findByCourseOfferingSectionId(sectionId);
    }

    @SuppressWarnings("null")
    public WeeklyTimetable save(WeeklyTimetable timetable) {
        return weeklyTimetableRepository.save(timetable);
    }
}

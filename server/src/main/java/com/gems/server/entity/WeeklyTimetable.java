package com.gems.server.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "weekly_timetable")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeeklyTimetable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_offering_id", nullable = false)
    private CourseOffering courseOffering;

    @Column(name = "day_of_week")
    private String dayOfWeek;

    @Column(name = "period_no")
    private Integer periodNo;

    private String room;

    @Column(name = "academic_year")
    private String academicYear;

    private Integer semester;
}

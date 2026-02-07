package com.gems.server.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "exams")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_offering_id", nullable = false)
    private CourseOffering courseOffering;

    @ManyToOne
    @JoinColumn(name = "exam_type_id", nullable = false)
    private ExamType examType;

    @Column(name = "exam_date")
    private LocalDate examDate;

    @Column(name = "max_marks")
    private Integer maxMarks;

    private String description;
}

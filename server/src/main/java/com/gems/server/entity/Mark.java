package com.gems.server.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "marks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Mark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "marks_obtained")
    private Double marksObtained;

    private String grade;

    private String remarks;

    @ManyToOne
    @JoinColumn(name = "entered_by")
    private Faculty enteredBy;

    @CreationTimestamp
    @Column(name = "entered_at", updatable = false)
    private LocalDateTime enteredAt;
}

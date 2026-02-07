package com.gems.server.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {
    @Id
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    @Column(unique = true, nullable = false)
    private String uan;

    @Column(name = "enrollment_no")
    private String enrollmentNo;

    private LocalDate dob;

    private String gender;

    @Column(name = "admission_year")
    private Integer admissionYear;

    @ManyToOne
    @JoinColumn(name = "batch_id")
    private Batch batch;

    @Column(name = "section_id")
    private Long sectionId;

    @ManyToOne
    @JoinColumn(name = "mentor_id")
    private Faculty mentor;

    @Column(name = "is_active")
    private Boolean isActive = true;
}

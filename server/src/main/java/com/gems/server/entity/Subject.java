package com.gems.server.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "subjects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String code;

    @Column(nullable = false)
    private String name;

    private Integer credit;

    private Integer semester;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @Builder.Default
    @Column(name = "is_active")
    private Boolean isActive = true;
}

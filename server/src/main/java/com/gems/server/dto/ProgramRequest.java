package com.gems.server.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProgramRequest {
    @NotNull(message = "Department ID is required")
    private Long departmentId;
    @NotBlank(message = "Name is required")
    private String name;
    private Integer durationYears;
}

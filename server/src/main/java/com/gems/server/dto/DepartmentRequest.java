package com.gems.server.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DepartmentRequest {
    @NotNull(message = "Institution ID is required")
    private Long institutionId;
    @NotBlank(message = "Name is required")
    private String name;
    private String code;
}

package com.gems.server.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class InstitutionRequest {
    @NotBlank(message = "Name is required")
    private String name;
    private String address;
}

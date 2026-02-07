package com.gems.server.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SectionRequest {
    @NotNull(message = "Batch ID is required")
    private Long batchId;
    @NotBlank(message = "Name is required")
    private String name;
}

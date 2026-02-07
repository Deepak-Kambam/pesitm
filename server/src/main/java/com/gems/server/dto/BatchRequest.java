package com.gems.server.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BatchRequest {
    @NotNull(message = "Program ID is required")
    private Long programId;
    @NotNull(message = "Start year is required")
    private Integer startYear;
    @NotNull(message = "End year is required")
    private Integer endYear;
}

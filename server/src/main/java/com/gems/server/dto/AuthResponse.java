package com.gems.server.dto;

import lombok.*;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private Long userId;
    private String username;
    private List<String> roles;
    @Builder.Default
    private String type = "Bearer";
}

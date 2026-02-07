package com.gems.server.dto;

import com.gems.server.entity.Attendance;
import lombok.Data;
import java.util.List;

@Data
public class AttendanceBatchRequest {
    private Long sessionId;
    private List<StudentStatus> studentStatuses;

    @Data
    public static class StudentStatus {
        private Long studentId;
        private Attendance.Status status;
    }
}

package com.gems.server.dto;

import lombok.Data;
import java.util.List;

@Data
public class MarkBatchRequest {
    private Long examId;
    private List<StudentMark> studentMarks;

    @Data
    public static class StudentMark {
        private Long studentId;
        private Double marksObtained;
        private String remarks;
    }
}

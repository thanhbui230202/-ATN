package com.example.webfilm.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class  PaymentDTO {
    @Builder
    public static class VNPayResponse{
        public String code;
        public String message;
        public String paymentUrl;
    }
}

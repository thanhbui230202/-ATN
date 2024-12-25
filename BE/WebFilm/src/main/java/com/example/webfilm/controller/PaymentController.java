package com.example.webfilm.controller;

import com.example.webfilm.config.VNPayConfig;
import com.example.webfilm.dto.PaymentDTO;
import com.example.webfilm.dto.ResponseObject;
import com.example.webfilm.service.PaymentServiceImpl;
import com.example.webfilm.service.VNPayServiceImpl;
import com.example.webfilm.util.VNPayUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    private PaymentServiceImpl paymentService;
    @Data
    @Builder
    public static class VNPayResponse {
        private String code;
        private String message;
        private String paymentUrl;
    }
    @GetMapping("/vn-pay")
    public ResponseObject<PaymentDTO.VNPayResponse> pay(
            @RequestParam Long amount,
            @RequestParam String bankCode,
            HttpServletRequest request
    ) {
        PaymentDTO.VNPayResponse vnPayResponse = paymentService.createVnPayPayment(request, amount, bankCode);
        return new ResponseObject<>(HttpStatus.OK, "Success", vnPayResponse);
    }
    @GetMapping("/vn-pay-callback")
    public ResponseObject<VNPayResponse> payCallbackHandler(HttpServletRequest request) {
        String status = request.getParameter("vnp_ResponseCode");
        if (status == null) {
            return new ResponseObject<>(HttpStatus.BAD_REQUEST, "Missing vnp_ResponseCode parameter", null);
        }

        if ("00".equals(status)) {
            VNPayResponse successResponse = VNPayResponse.builder()
                    .code("00")
                    .message("Success")
                    .paymentUrl("")
                    .build();
            return new ResponseObject<>(HttpStatus.OK, "Success", successResponse);
        } else {
            VNPayResponse failureResponse = VNPayResponse.builder()
                    .code(status)
                    .message("Failed with response code: " + status)
                    .paymentUrl(null)
                    .build();
            return new ResponseObject<>(HttpStatus.BAD_REQUEST, "Failed", failureResponse);
        }
    }

}

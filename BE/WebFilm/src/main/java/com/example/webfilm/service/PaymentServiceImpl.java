package com.example.webfilm.service;

import com.example.webfilm.config.VNPayConfig;
import com.example.webfilm.dto.PaymentDTO;
import com.example.webfilm.util.VNPayUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private VNPayConfig vnPayConfig;
    public PaymentDTO.VNPayResponse createVnPayPayment(HttpServletRequest request,Long amount, String bankCode) {
        try {
            // Parse and validate the amount parameter
            String amountStr = request.getParameter("amount");
            if (amountStr == null || amountStr.isEmpty()) {
                throw new IllegalArgumentException("Amount is required.");
            }
            // Initialize VNPay parameters from configuration
            Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig();
            vnpParamsMap.put("vnp_Amount", String.valueOf(amount * 100));
            if (bankCode != null && !bankCode.isEmpty()) {
                vnpParamsMap.put("vnp_BankCode", bankCode);
            }
            vnpParamsMap.put("vnp_IpAddr", VNPayUtils.getIpAddress(request));

            // Generate payment URL and secure hash
            String queryUrl = VNPayUtils.getPaymentURL(vnpParamsMap, true);
            String hashData = VNPayUtils.getPaymentURL(vnpParamsMap, false);
            String vnpSecureHash = VNPayUtils.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
            queryUrl += "&vnp_SecureHash=" + vnpSecureHash;

            // Construct the final payment URL
            String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;

            // Build and return the response
            return PaymentDTO.VNPayResponse.builder()
                    .code("00")
                    .message("Redirecting to VNPay")
                    .paymentUrl(paymentUrl)
                    .build();

        } catch (Exception e) {
            // Log and handle the exception
            e.printStackTrace();
            return PaymentDTO.VNPayResponse.builder()
                    .code("99")
                    .message("Failed to create VNPay payment: " + e.getMessage())
                    .paymentUrl(null)
                    .build();
        }
    }

    public String handlePaymentCallback(HttpServletRequest request) {
        String responseCode = request.getParameter("vnp_ResponseCode");
        if (responseCode == null) {
            throw new RuntimeException("Missing vnp_ResponseCode parameter");
        }
        if ("00".equals(responseCode)) {
            return "Success";
        } else {
            throw new RuntimeException("Payment failed with response code: " + responseCode);
        }
    }
}

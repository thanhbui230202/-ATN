package com.example.webfilm.service;

import com.example.webfilm.config.VNPayConfig;
import com.example.webfilm.util.VNPayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class VNPayServiceImpl {
    @Autowired
    private VNPayConfig vnpayConfig;
    public String generatePaymentUrl(BigDecimal amount, Integer bookingId) {
        validateAmount(amount);
        String vnpTxnRef = UUID.randomUUID().toString().replace("-", "").substring(0, 34);
        String vnpIpAddr = "127.0.0.1"; // Replace with a method to get user IP
        String orderInfo = "Payment for booking ID " + bookingId;

        Map<String, String> vnpParams = new HashMap<>();
        vnpParams.put("vnp_Version", "2.1.0");
        vnpParams.put("vnp_Command", "pay");
        vnpParams.put("vnp_TmnCode", vnpayConfig.getVNPayConfig().get("tmnCode"));
        vnpParams.put("vnp_Amount", String.valueOf(amount.multiply(BigDecimal.valueOf(100)).longValue()));
        vnpParams.put("vnp_CurrCode", "VND");
        vnpParams.put("vnp_TxnRef", vnpTxnRef);
        vnpParams.put("vnp_OrderInfo", orderInfo);
        vnpParams.put("vnp_OrderType", "billpayment");
        vnpParams.put("vnp_Locale", "vn");
        vnpParams.put("vnp_ReturnUrl", vnpayConfig.getVNPayConfig().get("returnUrl"));
        vnpParams.put("vnp_IpAddr", vnpIpAddr);

        try {
            String query = buildQuery(vnpParams);
            String hashData = buildHashData(vnpParams);
            String secureHash = VNPayUtils.hmacSHA512(hashData, vnpayConfig.getVNPayConfig().get("hashSecret"));

            return vnpayConfig.getVNPayConfig().get("payUrl") + "?" + query + "&vnp_SecureHash=" + secureHash;
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("Error encoding VNPay parameters", e);
        }
    }

    private void validateAmount(BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero.");
        }
    }

    private String buildQuery(Map<String, String> params) throws UnsupportedEncodingException {
        return params.entrySet().stream()
                .map(entry -> URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8) + "=" +
                        URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8))
                .collect(Collectors.joining("&"));
    }

    private String buildHashData(Map<String, String> params) {
        return params.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(entry -> entry.getKey() + "=" + entry.getValue())
                .collect(Collectors.joining("&"));
    }
    public boolean verifyPayment(Integer bookingId, BigDecimal amount) {
        return true;
    }
}

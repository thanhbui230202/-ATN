package com.example.webfilm.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "payment")
public class Payment {
    @Id
    @Column(name = "payment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentId;

    @OneToOne
    @JoinColumn(name = "booking_id",nullable = false)
    private Booking booking;

    @NotNull(message = "Payment method cannot be null")
    @Column(name = "payment_method")
    private String paymentMethod;

    @NotNull(message = "Payment time cannot be null")
    @Column(name = "payment_time")
    private LocalDateTime paymentTime;

    @NotNull(message = "Amount method cannot be null")
    @DecimalMin(value = "0.0", inclusive = false, message = "Amount must be greater than 0")
    @Column(name = "amount")
    private BigDecimal amount;
    @Column(name = "vnp_txn_ref")

    private String vnpTxnRef;

    @Column(name = "vnp_response_code")
    private String vnpResponseCode;

    @Column(name = "vnp_transaction_status")
    private String vnpTransactionStatus;
    public Payment(String paymentMethod, LocalDateTime paymentTime, BigDecimal amount, Booking booking, String paymentUrl) {
        this.paymentMethod = paymentMethod;
        this.paymentTime = paymentTime;
        this.amount = amount;
        this.booking = booking;

        // If paymentUrl is provided, set VNP transaction ref or status as needed
        this.vnpTxnRef = paymentUrl;  // assuming the payment URL is tied to the transaction reference
        this.vnpTransactionStatus = "Pending";  // initial status, you can update later
    }

}

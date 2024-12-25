package com.example.webfilm.dto;

import com.example.webfilm.entity.Showtime;
import com.example.webfilm.entity.User;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
@Data
public class BookingDTO {
    private User user;
    private Showtime showtime;
    private List<Integer> seatIds;
    private BigDecimal totalPrice;
    private String paymentStatus;
    private LocalDateTime bookingDate;
    private PaymentDTO payment;

}

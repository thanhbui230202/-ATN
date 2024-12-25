package com.example.webfilm.dto;

import com.example.webfilm.entity.Booking;
import com.example.webfilm.entity.Payment;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookingResponse {
    private BookingDTO booking;
    private Payment payment;
}

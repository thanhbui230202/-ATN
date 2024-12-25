package com.example.webfilm.controller;

import com.example.webfilm.dto.BookingDTO;
import com.example.webfilm.dto.BookingResponse;
import com.example.webfilm.entity.Booking;
import com.example.webfilm.entity.Payment;
import com.example.webfilm.service.BookingServiceImpl;
import com.example.webfilm.service.VNPayServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/booking")
public class BookingController {
    @Autowired
    private BookingServiceImpl bookingService;
    @Autowired
    private VNPayServiceImpl vnPayService;
    @PostMapping(value = "/create")
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        try {
            BookingDTO createdBookingDTO = bookingService.createBooking(booking);
            return new ResponseEntity<>(createdBookingDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}

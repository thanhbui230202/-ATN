package com.example.webfilm.controller;

import com.example.webfilm.entity.Seat;

import com.example.webfilm.service.SeatServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/seats")
public class SeatController {
    @Autowired
    private SeatServiceImpl seatService;
    @GetMapping("/screening/{showtimeId}")
    public ResponseEntity<List<Seat>> getScreeningSeats(@PathVariable Integer showtimeId) {
        List<Seat> seats = seatService.getAllSeatsByShowTime(showtimeId);
        if (seats.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(seats);
    }
}

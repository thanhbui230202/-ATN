package com.example.webfilm.controller;

import com.example.webfilm.entity.BookedSeat;
import com.example.webfilm.service.BookedSeatServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/booked-seats")
public class BookedSeatController {
    @Autowired
    private BookedSeatServiceImpl bookedSeatService;
    @GetMapping("/showtime/{showtimeId}")
    public ResponseEntity<List<BookedSeat>> getBookedSeatsByShowtime(@PathVariable Integer showtimeId) {
        List<BookedSeat> bookedSeats = bookedSeatService.getBookedSeatsByShowtime(showtimeId);
        if (bookedSeats.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(bookedSeats);
    }
}

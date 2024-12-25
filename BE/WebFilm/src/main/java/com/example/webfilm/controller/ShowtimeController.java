package com.example.webfilm.controller;

import com.example.webfilm.dto.ShowtimeAndCinemaDTO;
import com.example.webfilm.service.ShowTimeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/showtime")
public class ShowtimeController {
    @Autowired
    private ShowTimeServiceImpl showTimeService;
    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<ShowtimeAndCinemaDTO>> getShowtimeAndCinemaByMovie(@PathVariable Integer movieId) {
        List<ShowtimeAndCinemaDTO> showtimes = showTimeService.getShowtimeAndCinemaByMovie(movieId);

        if (showtimes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(showtimes);
    }
}

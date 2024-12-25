package com.example.webfilm.controller;

import com.example.webfilm.entity.Cinema;
import com.example.webfilm.service.CinemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/cinema")
public class CinemaController {
    @Autowired
    private CinemaService cinemaService;
    @GetMapping("/list")
    public ResponseEntity<List<Cinema>> getAllCinema() {
        List<Cinema> cinemas = cinemaService.getAllCinemas();
        return new ResponseEntity<>(cinemas, HttpStatus.OK);
    }
    @PostMapping("/save")
    public ResponseEntity<?> saveCinema(@RequestBody Cinema cinema) {
        cinemaService.saveCinema(cinema);
        return new ResponseEntity<>(cinema, HttpStatus.OK);
    }
}

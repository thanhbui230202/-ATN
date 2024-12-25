package com.example.webfilm.service;

import com.example.webfilm.entity.Cinema;

import java.util.List;

public interface CinemaService {
    Cinema saveCinema(Cinema cinema);
    Cinema getCinemaById(int id);
    List<Cinema> getAllCinemas();
}

package com.example.webfilm.service;

import com.example.webfilm.entity.Showtime;

import java.util.List;

public interface ShowTimeService {
    Showtime addShowtime(Showtime showtime);
    List<Showtime> finAllShowtimes();
//    Showtime updateShowtime(Showtime showtime);
}

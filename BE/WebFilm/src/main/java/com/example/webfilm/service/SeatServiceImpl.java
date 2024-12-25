package com.example.webfilm.service;

import com.example.webfilm.entity.Seat;
import com.example.webfilm.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatServiceImpl implements SeatService {
    @Autowired
    private SeatRepository seatRepository;

    public List<Seat> getAllSeatsByShowTime(Integer showtimeId) {
        return seatRepository.findSeatsByShowtime(showtimeId);
    }
}

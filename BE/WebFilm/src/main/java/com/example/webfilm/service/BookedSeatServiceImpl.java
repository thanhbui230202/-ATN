package com.example.webfilm.service;

import com.example.webfilm.entity.BookedSeat;
import com.example.webfilm.repository.BookedSeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookedSeatServiceImpl implements BookedSeatService {
    @Autowired
    private BookedSeatRepository bookedSeatRepository;
    public List<BookedSeat> getBookedSeatsByShowtime(Integer showtimeId) {
        return bookedSeatRepository.findByShowtimeId(showtimeId);
    }
}

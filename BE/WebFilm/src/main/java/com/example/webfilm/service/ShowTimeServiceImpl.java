package com.example.webfilm.service;

import com.example.webfilm.dto.ShowtimeAndCinemaDTO;
import com.example.webfilm.entity.Showtime;
import com.example.webfilm.repository.ShowTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class ShowTimeServiceImpl implements ShowTimeService{
    @Autowired
    ShowTimeRepository showTimeRepository;
    @Override
    public Showtime addShowtime(Showtime showtime) {
        return showTimeRepository.save(showtime);
    }

    @Override
    public List<Showtime> finAllShowtimes() {
        return showTimeRepository.findAll();
    }

    public List<ShowtimeAndCinemaDTO> getShowtimeAndCinemaByMovie(Integer movieId) {
        List<Object[]> results = showTimeRepository.findShowtimeAndCinemaByMovie(movieId);
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy"); // Format for the date
        SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm"); // Format for the time

        // Map the results to DTO
        return results.stream()
                .map(result -> {
                    Integer showtimeId = (Integer) result[0];
                    String cinemaName = (String) result[1];  // Casting cinema name
                    String cinemaLocation = (String) result[2]; // Casting cinema location
                    Date startTime = (Date) result[3];  // Casting showtime start time
                    String showDate = dateFormat.format(startTime); // Extract the date
                    String showTime = timeFormat.format(startTime); // Extract the time
                    return new ShowtimeAndCinemaDTO(showtimeId,cinemaName, cinemaLocation, showDate,showTime);
                })
                .toList();
    }

}

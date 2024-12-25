package com.example.webfilm.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShowtimeAndCinemaDTO {
    private Integer showtimeId;
    private String cinemaName;
    private String cinemaLocation;
    private String showDate;
    private String showTime;
}

package com.example.webfilm.repository;

import com.example.webfilm.entity.BookedSeat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookedSeatRepository extends JpaRepository<BookedSeat,Integer> {
    @Query("SELECT bs FROM BookedSeat bs WHERE bs.booking.showtime.showtimeId = :showtimeId")
    List<BookedSeat> findByShowtimeId(@Param("showtimeId") Integer showtimeId);
}

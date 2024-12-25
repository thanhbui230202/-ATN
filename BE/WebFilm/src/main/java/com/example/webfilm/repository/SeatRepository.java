package com.example.webfilm.repository;

import com.example.webfilm.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Integer> {
    @Query("SELECT s FROM Seat s " +
            "JOIN s.room r " +
            "JOIN r.showtimes st " +
            "WHERE st.showtimeId = :showtimeId")
    List<Seat> findSeatsByShowtime(@Param("showtimeId") Integer showtimeId);

}

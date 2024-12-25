package com.example.webfilm.repository;

import com.example.webfilm.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowTimeRepository extends JpaRepository<Showtime,Integer> {
    @Query("SELECT s.showtimeId, c.name, c.location, s.startTime " +
            "FROM Showtime s " +
            "JOIN s.screeningRoom r " +
            "JOIN r.cinema c " +
            "WHERE s.movie.movieId = :movieId")
    List<Object[]> findShowtimeAndCinemaByMovie(@Param("movieId") Integer movieId);
}

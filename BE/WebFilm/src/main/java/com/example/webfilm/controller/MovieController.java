package com.example.webfilm.controller;

import com.example.webfilm.dto.MovieDTO;
import com.example.webfilm.entity.Movie;
import com.example.webfilm.service.MovieService;
import com.example.webfilm.service.MovieServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/movie")
public class MovieController {
    @Autowired
    private MovieServiceImpl movieServiceImpl;

    @GetMapping("/list")
    public ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> movies = movieServiceImpl.getAllMovies();
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveMovie(@RequestBody Movie movie) {
        movieServiceImpl.addMovie(movie);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateMovie(@RequestBody Movie movie) {
        movieServiceImpl.updateMovie(movie);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{movieId}")
    public Optional<Movie> findMovieById(@PathVariable Integer movieId) {
        return movieServiceImpl.getMovieById(movieId);
    }
}

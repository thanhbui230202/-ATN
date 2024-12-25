package com.example.webfilm.service;

import com.example.webfilm.entity.Movie;

import java.util.List;
import java.util.Optional;

public interface MovieService { ;
    List<Movie> getAllMovies();
    Movie addMovie(Movie movie);
    Movie updateMovie(Movie movie);
    void deleteMovie(int id);
}

package com.example.webfilm.service;

import com.example.webfilm.entity.CategoryFilm;

import java.util.List;

public interface CategoryFilmService {
    List<CategoryFilm> findAll();
     void save(CategoryFilm categoryFilm);
}

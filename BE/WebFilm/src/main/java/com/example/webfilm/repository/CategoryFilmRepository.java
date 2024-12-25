package com.example.webfilm.repository;

import com.example.webfilm.entity.CategoryFilm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryFilmRepository extends JpaRepository<CategoryFilm, Integer> {

}

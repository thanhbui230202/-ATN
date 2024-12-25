package com.example.webfilm.controller;

import com.example.webfilm.entity.CategoryFilm;
import com.example.webfilm.service.CategoryFilmService;
import com.example.webfilm.service.CategoryFilmServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/category")
public class CategoryFilmController {
    @Autowired
    private CategoryFilmServiceImpl categoryFilmServiceImpl;
    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody CategoryFilm categoryFilm) {
        categoryFilmServiceImpl.save(categoryFilm);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/list")
    public ResponseEntity<List<CategoryFilm>> list() {
       List<CategoryFilm> categoryFilmList = categoryFilmServiceImpl.findAll();
       return new ResponseEntity<>(categoryFilmList, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Integer id) {
        categoryFilmServiceImpl.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<CategoryFilm> updateCategory(@PathVariable Integer id, @RequestBody CategoryFilm categoryFilm) {
        CategoryFilm updatedCategory = categoryFilmServiceImpl.updateCategory(id,categoryFilm);
        return ResponseEntity.ok(updatedCategory);
    }
}

package com.example.webfilm.service;

import com.example.webfilm.entity.CategoryFilm;
import com.example.webfilm.repository.CategoryFilmRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryFilmServiceImpl implements CategoryFilmService {
    @Autowired
    private CategoryFilmRepository categoryFilmRepository;

    @Override
    public List<CategoryFilm> findAll() {
        return categoryFilmRepository.findAll();
    }

    @Override
    public void save(CategoryFilm categoryFilm) {
        categoryFilmRepository.save(categoryFilm);
    }
    @Transactional
    public CategoryFilm updateCategory(Integer id, CategoryFilm categoryFilm) {
        CategoryFilm category = categoryFilmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id " + id));
        category.setCategoryName(categoryFilm.getCategoryName());
        category.setDescription(categoryFilm.getDescription());
        return categoryFilmRepository.save(category);
    }
    @Transactional
    public void deleteCategory(Integer id) {
        CategoryFilm category = categoryFilmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id " + id));
        categoryFilmRepository.delete(category);
    }
}

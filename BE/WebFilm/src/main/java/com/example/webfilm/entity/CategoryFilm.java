package com.example.webfilm.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "category")
public class CategoryFilm {
    @Id
    @Column(name = "category_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer categoryId;

    @Column(name = "category_name")
    @NotBlank(message = "Genre name cannot be blank")
    @Size(max = 100, message = "Genre name cannot exceed 100 characters")
    private String categoryName;
    @Column(name = "description",length = 1000)
    private String description;
}

package com.example.webfilm.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "movie")
public class Movie {
    @Id
    @Column(name = "movie_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer movieId;

    @Column(name = "movie_name")
    @NotBlank(message = "Title cannot be blank")
    @Size(max = 255, message = "Title cannot exceed 255 characters")
    private String nameMovie;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryFilm categoryFilm;

    @Column(name = "duration")
    @NotNull(message = "Duration is required")
    private Integer duration;

    @Column(name = "movie_viewing_age")
    @NotNull
    private String movieViewingAge;

    @Column(name = "release_date")
    @Temporal(TemporalType.DATE)
    private Date releaseDate;
    @Column(name = "poster",length = 1000)
    private String poster;
    @Column(name = "trailer",length = 1000)
    private String trailer;
    @Column(name = "description",length = 1000)
    private String description;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Showtime> showtimes = new ArrayList<>();
}

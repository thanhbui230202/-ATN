package com.example.webfilm.dto;

public class MovieDTO {
    private Integer movieId;
    private String namMovie;
    private String poster;
    private String age;
    private String categoryName;
    private String releaseDate;
    private String description;

    public MovieDTO(Integer movieId, String namMovie, String poster, String age, String categoryName, String releaseDate, String description) {
        this.movieId = movieId;
        this.namMovie = namMovie;
        this.poster = poster;
        this.age = age;
        this.categoryName = categoryName;
        this.releaseDate = releaseDate;
        this.description = description;
    }
    public MovieDTO() {
    }

    public Integer getMovieId() {
        return movieId;
    }

    public void setMovieId(Integer movieId) {
        this.movieId = movieId;
    }

    public String getNamMovie() {
        return namMovie;
    }

    public void setNamMovie(String namMovie) {
        this.namMovie = namMovie;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

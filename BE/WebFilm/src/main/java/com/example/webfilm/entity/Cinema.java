package com.example.webfilm.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cinema")
public class Cinema {
    @Id
    @Column(name = "cinema_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cinemaId;

    @Column(name = "name")
    @NotBlank(message = "Cinema name cannot be blank")
    @Size(max = 255, message = "Cinema name cannot exceed 255 characters")
    private String name;

    @Column(name = "location")
    private String location;

    @Column(name = "phone_number")
    @Size(max = 20, message = "Phone number cannot exceed 20 characters")
    private String phoneNumber;

    @Column(name = "total_rooms")
    private Integer totalRooms;

    @OneToMany(mappedBy = "cinema")
    @JsonBackReference
    private List<ScreeningRoom> rooms;
}

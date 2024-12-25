package com.example.webfilm.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "screening_room")
public class ScreeningRoom {

    @Id
    @Column(name = "room_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomId;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "cinema_id")
    private Cinema cinema;

    @Column(name = "name")
    @NotBlank(message = "Room name cannot be blank")
    private String name;

    @Column(name = "seat_capacity")
    @NotNull(message = "Seat capacity is required")
    private Integer seatCapacity;

    @OneToMany(mappedBy = "room")
    @JsonManagedReference
    private List<Seat> seats;

    @OneToMany(mappedBy = "screeningRoom")
    @JsonBackReference
    private List<Showtime> showtimes = new ArrayList<>();
}

package com.example.webfilm.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class User {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(name = "username")
    @NotBlank(message = "Username cannot be blank")
    @Size(max = 255, message = "Username cannot exceed 255 characters")
    private String username;

    @Column(name = "fullName")
    private String fullName;

    @Column(name = "password")
    @NotBlank(message = "Password cannot be blank")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @Column(name = "email")
    @Email(message = "Email invalid correct format")
    @NotBlank(message = "Email cannot be blank")
    private String email;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "phone_number")
    @Size(max = 10, message = "Phone number cannot exceed 20 characters")
    private String phoneNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role = Role.CUSTOMER;

    private enum Role {
        CUSTOMER, ADMIN
    }

    // Status: 0 = Locked, 1 = Active
    private int status = 1;
    public String getRole() {
        return this.role.name();
    }
    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings = new ArrayList<>();
}

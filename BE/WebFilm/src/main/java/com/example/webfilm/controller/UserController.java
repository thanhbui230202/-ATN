package com.example.webfilm.controller;

import com.example.webfilm.dto.UserDTO;
import com.example.webfilm.entity.User;
import com.example.webfilm.service.UserService;
import com.example.webfilm.service.UserServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserServiceImpl userServiceImpl;
    @GetMapping("/list")
    public ResponseEntity<List<UserDTO>> findAll() {
        List<User> users = userService.findAll();
        List<UserDTO> userDTOs = users.stream()
                .filter(user -> "CUSTOMER".equalsIgnoreCase(user.getRole()))
                .map(user -> {
                    UserDTO dto = new UserDTO();
                    dto.setId(user.getUserId());
                    dto.setUsername(user.getUsername());
                    dto.setEmail(user.getEmail());
                    dto.setPhoneNumber(user.getPhoneNumber());
                    dto.setRole(user.getRole());
                    dto.setStatus(user.getStatus());
                    dto.setDateOfBirth(user.getDateOfBirth() != null
                            ? user.getDateOfBirth().toString()
                            : "N/A");
                    return dto;
                })
                .collect(Collectors.toList());
        return new ResponseEntity<>(userDTOs, HttpStatus.OK);
    }
    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errorMessage = new StringBuilder();
            bindingResult.getAllErrors().forEach(error -> errorMessage.append(error.getDefaultMessage()).append("\n"));
            return new ResponseEntity<>(errorMessage.toString(), HttpStatus.BAD_REQUEST);
        }
        try {
            userServiceImpl.register(user.getUsername(), user.getEmail(), user.getPassword());
            return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            String token = userServiceImpl.login(user.getUsername(), user.getPassword());
            String[] parts = token.split("\\|");
            String jwtToken = parts[0];
            String role = parts.length > 1 ? parts[1] : "CUSTOMER";

            return ResponseEntity.ok(Map.of("token", jwtToken, "role", role));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", e.getMessage()));
        }
    }
    @GetMapping("/logout")
    public ResponseEntity<?> logout() {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .domain("")
                .path("/")  
                .maxAge(0)
                .httpOnly(true)
                .secure(true)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Logged out successfully");
    }
    @PutMapping("/{userId}/lock")
    public ResponseEntity<?> lockUser(@PathVariable Integer userId) {
        userServiceImpl.lockUser(userId);
        return ResponseEntity.ok("User account locked successfully.");
    }

    @PutMapping("/{userId}/unlock")
    public ResponseEntity<?> unlockUser(@PathVariable Integer userId) {
        userServiceImpl.unlockUser(userId);
        return ResponseEntity.ok("User account unlocked successfully.");
    }
    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getUsers(@PathVariable Integer userId) {
       try {
           User user = userServiceImpl.getUserById(userId);
           return ResponseEntity.ok(user);
       } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
       }
    }
}

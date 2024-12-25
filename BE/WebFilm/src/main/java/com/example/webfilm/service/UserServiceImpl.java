package com.example.webfilm.service;

import com.example.webfilm.dto.UserDTO;
import com.example.webfilm.util.JwtUtil;
import com.example.webfilm.entity.User;
import com.example.webfilm.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }


    @Transactional
    public void lockUser(Integer userId) {
        if (!userRepository.existsById(userId)) {
            throw new IllegalArgumentException("User ID does not exist: " + userId);
        }
        userRepository.updateUserStatus(userId, 0);
    }
    @Transactional
    public void unlockUser(Integer userId) {
        if (!userRepository.existsById(userId)) {
            throw new IllegalArgumentException("User ID does not exist: " + userId);
        }
        userRepository.updateUserStatus(userId, 1);
    }

    public void register(String username, String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email is already in use");
        }
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username is already in use");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }




    public String login(String username, String password) {
        Optional<User> userOpt  = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        User user = userOpt.get();
        if (user.getStatus() == 0) {
            throw new RuntimeException("Account is locked");
        }
        if (passwordEncoder.matches(password, user.getPassword())) {
            String token = jwtUtil.generateToken(user.getUsername(),user.getRole(),user.getUserId());
            return token + "|" + user.getRole();
        }
        throw new RuntimeException("Invalid credentials");
    }
    public User getUserById(Integer id) {
        return userRepository.getReferenceById(id);
    }
}

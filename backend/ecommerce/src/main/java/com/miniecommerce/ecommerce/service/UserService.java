package com.miniecommerce.ecommerce.service;

import com.miniecommerce.ecommerce.model.User;
import com.miniecommerce.ecommerce.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Register new user
    public User register(User user){
        return userRepository.save(user);
    }

    // Find user by email
    public Optional<User> findByEmail(String email){
         return userRepository.findByEmail(email);
    }

    // Load user by email
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole())
                .build();
    }

    // Create a new user (registration)
    public User registerUser(String email, String rawPassword, String role) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Username already exists");
        }

        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(rawPassword)) // encrypt password
                .role(role)
                .build();

        return userRepository.save(user);
    }
}

package com.miniecommerce.ecommerce.service;

import com.miniecommerce.ecommerce.model.User;
import com.miniecommerce.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register new user
    public User register(User user){
        return userRepository.save(user);
    }

    // Find user by email
    public Optional<User> findByEmail(String email){
         return userRepository.findByEmail(email);
    }
}

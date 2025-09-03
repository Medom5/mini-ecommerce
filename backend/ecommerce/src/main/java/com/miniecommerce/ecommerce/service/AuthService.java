package com.miniecommerce.ecommerce.service;


import com.miniecommerce.ecommerce.model.User;
import com.miniecommerce.ecommerce.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.AuthenticationException;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // Register user and return JWT
    public String register(String username, String password, String role) {
        User user = userService.registerUser(username, password, role);
        return jwtService.generateToken(user.getEmail());
    }

    // Login and return JWT
    public String login(String username, String password) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid username or password");
        }

        User user = userService.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Invalid username or password"));
        return jwtService.generateToken(user.getEmail());
    }
}

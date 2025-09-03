package com.miniecommerce.ecommerce.service;


import com.miniecommerce.ecommerce.dto.AuthRequest;
import com.miniecommerce.ecommerce.dto.RegisterRequest;
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

    // Register
    public String register(RegisterRequest request) {
        User user = userService.registerUser(
                request.username(),
                request.password(),
                request.role()
        );
        return jwtService.generateToken(user.getEmail());
    }

    // Login
    public String login(AuthRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.username(),
                            request.password()
                    )
            );
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid username or password");
        }

        User user = userService.findByEmail(request.username())
                .orElseThrow(() -> new UsernameNotFoundException("Invalid username or password"));
        return jwtService.generateToken(user.getEmail());
    }
}

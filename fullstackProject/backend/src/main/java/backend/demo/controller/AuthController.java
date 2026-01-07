package backend.demo.controller;

import backend.demo.dto.LoginRequest;
import backend.demo.dto.RegisterRequest;
import backend.demo.model.User;
import backend.demo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" }) // React frontend
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public org.springframework.http.ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User user = authService.register(request.getName(), request.getEmail(), request.getPassword(),
                    request.getRole());
            return org.springframework.http.ResponseEntity.ok(user);
        } catch (Exception e) {
            return org.springframework.http.ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public org.springframework.http.ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            User user = authService.login(request.getEmail(), request.getPassword());
            return org.springframework.http.ResponseEntity.ok(user);
        } catch (Exception e) {
            return org.springframework.http.ResponseEntity.status(401).body(e.getMessage()); // 401 Unauthorized
        }
    }
}

package backend.demo.controller;

import backend.demo.dto.LoginRequest;
import backend.demo.dto.RegisterRequest;
import backend.demo.model.User;
import backend.demo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" })
public class AuthController {

    @Autowired
    private AuthService authService;

    // ✅ REGISTER API (UPDATED)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            authService.register(
                    request.getName(),
                    request.getEmail(),
                    request.getPassword(),
                    null // ✅ ROLE handled inside service (default = Commuter)
            );
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ✅ LOGIN API (OK AS IS)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            User user = authService.login(
                    request.getEmail(),
                    request.getPassword());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}

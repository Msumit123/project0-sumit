package backend.demo.service;

import backend.demo.model.User;
import backend.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // BCrypt encoder (secure)
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // ================= REGISTER =================
    @Transactional
    public User register(String name, String email, String password, String role) throws Exception {

        // Email already exists
        if (userRepository.existsByEmail(email)) {
            throw new Exception("Email already exists");
        }

        // Encrypt password
        String encodedPassword = passwordEncoder.encode(password);

        // Default role (IMPORTANT)
        String userRole = (role != null && !role.trim().isEmpty())
                ? role
                : "Commuter";

        // Create user
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(encodedPassword);
        user.setRole(userRole);
        user.setTravelPreferences("");
        user.setSavedLocations("");

        return userRepository.save(user);
    }

    // ================= LOGIN =================
    public User login(String email, String password) throws Exception {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("Invalid email or password"));

        // Match raw password with BCrypt hash
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new Exception("Invalid email or password");
        }

        return user;
    }
}

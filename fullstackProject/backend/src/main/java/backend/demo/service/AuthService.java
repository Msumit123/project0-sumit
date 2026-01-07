package backend.demo.service;

import backend.demo.model.User;
import backend.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User register(String name, String email, String password, String role) throws Exception {
        if (userRepository.existsByEmail(email)) {
            throw new Exception("Email already exists");
        }
        String encodedPassword = passwordEncoder.encode(password);
        // Default role if null
        String userRole = (role != null && !role.isEmpty()) ? role : "Commuter";
        User user = new User(name, email, encodedPassword, userRole);
        return userRepository.save(user);
    }

    public User login(String email, String password) throws Exception {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("User not found"));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new Exception("Invalid credentials");
        }
        return user;
    }
}

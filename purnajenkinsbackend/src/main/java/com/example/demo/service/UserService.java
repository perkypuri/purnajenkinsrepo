package com.example.demo.service;

import com.example.demo.model.User;
import java.util.List;

public interface UserService {
    
    // Add a new user
    User addUser(User user);
    
    // View all users
    List<User> viewAllUsers();
    
    // Delete user by id
    void deleteUser(Long id);
}

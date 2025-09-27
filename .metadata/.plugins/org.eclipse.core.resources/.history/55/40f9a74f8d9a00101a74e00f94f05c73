package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")   // Base URL → http://localhost:8080/user
public class UserController {

    @Autowired
    private UserService userService;

    // Add new user → POST http://localhost:8080/user/add
    @PostMapping("/add")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    // View all users → GET http://localhost:8080/user/viewall
    @GetMapping("/viewall")
    public List<User> viewAllUsers() {
        return userService.viewAllUsers();
    }

    // Delete user by id → DELETE http://localhost:8080/user/delete/{id}
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User with ID " + id + " deleted successfully.";
    }
}

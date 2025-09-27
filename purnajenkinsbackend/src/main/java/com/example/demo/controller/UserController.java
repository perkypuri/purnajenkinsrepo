package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*") // allow all origins for frontend
public class UserController {

    @Autowired
    private UserService userService;

    // Add a new user → POST /user/add
    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User savedUser = userService.addUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    // View all users → GET /user/viewall
    @GetMapping("/viewall")
    public ResponseEntity<List<User>> viewAllUsers() {
        List<User> users = userService.viewAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Delete user by id → DELETE /user/delete/{id}
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return new ResponseEntity<>("User with ID " + id + " deleted successfully.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Cannot delete. User with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}

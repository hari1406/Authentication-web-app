package com.authproject.controller;

import com.authproject.dto.*;
import com.authproject.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/signup")
    public String signup(
            @RequestBody SignupRequest request) {

        return service.signup(request);
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(
            @RequestBody OtpRequest request) {

        return service.verifyOtp(request);
    }

    @PostMapping("/login")
    public String login(
            @RequestBody LoginRequest request) {

        return service.login(request);
    }
}
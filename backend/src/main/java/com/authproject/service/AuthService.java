package com.authproject.service;

import com.authproject.dto.*;
import com.authproject.model.User;
import com.authproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private EmailService emailService;

    public String signup(SignupRequest request) {
        try{
        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        String otp =
                String.valueOf(
                        (int)(100000 + Math.random() * 900000)
                );

        user.setOtp(otp);
        user.setVerified(false);

        repository.save(user);

        emailService.sendOtp(
                request.getEmail(),
                otp
        );

        return "OTP Sent";}
        catch (Exception e){
            e.printStackTrace();
            return e.toString();
        }
    }

    public String verifyOtp(OtpRequest request) {

        User user = repository
                .findByEmail(request.getEmail())
                .orElseThrow();
        System.out.println("DB OTP = " + user.getOtp());
        System.out.println("USER OTP = " + request.getOtp());
        if(user.getOtp().equals(request.getOtp())) {

            user.setVerified(true);
            repository.save(user);

            return "Verified Successfully";
        }

        return "Invalid OTP";
    }

    public String login(LoginRequest request) {

        User user = repository
                .findByEmail(request.getEmail())
                .orElseThrow();

        if(!user.isVerified()) {
            return "Verify OTP First";
        }

        if(user.getPassword()
                .equals(request.getPassword())) {

            return "Login Successful";
        }

        return "Invalid Credentials";
    }
}
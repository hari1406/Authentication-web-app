package com.authproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender sender;

    public void sendOtp(String email, String otp) {

        SimpleMailMessage message =
                new SimpleMailMessage();
        message.setFrom("varshanhari35@gmail.com");
        message.setTo(email);
        message.setSubject("OTP Verification");
        message.setText("Your OTP is : " + otp);

        sender.send(message);
    }
}
package com.wiseowls.StudentLink.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wiseowls.StudentLink.Services.loginService;
import com.wiseowls.StudentLink.dtos.loginRequestDTO;
import com.wiseowls.StudentLink.dtos.loginResponseDTO;

@RestController
@RequestMapping("/api/login")
public class logincontroller {
    @Autowired
    private loginService loginService;

    @PostMapping("/login")
    public ResponseEntity<loginResponseDTO> login(@RequestBody loginRequestDTO loginRequestDTO) {
        loginResponseDTO response = loginService.validateUser(loginRequestDTO);
        return  ResponseEntity.ok(response);
    }
}
package com.librify.controller;

import com.librify.dto.*;
import com.librify.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO dto) {
        try {
            return ResponseEntity.ok(authService.login(dto));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(Map.of("erro", e.getMessage()));
        }
    }

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastro(@Valid @RequestBody CadastroRequestDTO dto) {
        try {
            authService.cadastrar(dto);
            return ResponseEntity.ok(Map.of("mensagem", "Cadastro realizado com sucesso"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    @PostMapping("/recuperar-senha")
    public ResponseEntity<?> recuperarSenha(@RequestBody Map<String, String> body) {
        try {
            authService.recuperarSenha(body.get("email"));
            return ResponseEntity.ok(Map.of("mensagem", "Instruções de recuperação enviadas para seu email"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }
}

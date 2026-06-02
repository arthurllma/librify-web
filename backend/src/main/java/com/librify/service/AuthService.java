package com.librify.service;

import com.librify.dto.*;
import com.librify.model.User;
import com.librify.repository.UserRepository;
import com.librify.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public LoginResponseDTO login(LoginRequestDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email ou senha incorretos"));

        if (!passwordEncoder.matches(dto.getSenha(), user.getSenha())) {
            throw new IllegalArgumentException("Email ou senha incorretos");
        }

        String token = jwtUtil.gerarToken(user.getEmail(), user.getRole().name());
        return new LoginResponseDTO(token, user.getId(), user.getNome(), user.getEmail(), user.getRole().name());
    }

    public void cadastrar(CadastroRequestDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("O email informado já está cadastrado");
        }

        userRepository.save(User.builder()
                .nome(dto.getNome())
                .email(dto.getEmail())
                .senha(passwordEncoder.encode(dto.getSenha()))
                .build());
    }

    public void recuperarSenha(String email) {
        if (!userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email não encontrado no sistema");
        }
        // Integração com serviço de e-mail seria adicionada aqui
    }
}

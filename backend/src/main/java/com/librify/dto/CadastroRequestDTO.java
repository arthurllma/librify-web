package com.librify.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CadastroRequestDTO {
    @NotBlank
    private String nome;

    @NotBlank @Email
    private String email;

    @NotBlank
    @Pattern(
        regexp = "^(?=.*[A-Z])(?=.*\\d).{8,}$",
        message = "A senha deve ter pelo menos 8 caracteres, incluindo um número e uma letra maiúscula"
    )
    private String senha;
}

package com.librify.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PublicacaoDTO {
    @NotBlank private String titulo;
    @NotBlank private String autor;
    private String genero;
    private String descricao;
    private String arquivoUrl;
}

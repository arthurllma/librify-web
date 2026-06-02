package com.librify.dto;

import lombok.Data;

@Data
public class LivroDTO {
    private String titulo;
    private String autor;
    private String descricao;
    private String categoria;
    private String capaUrl;
    private String arquivoPdfUrl;
}

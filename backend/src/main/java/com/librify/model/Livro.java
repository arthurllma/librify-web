package com.librify.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "livros")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Livro {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String autor;

    @Column(length = 2000)
    private String descricao;

    private String categoria;
    private String capaUrl;
    private String arquivoPdfUrl;

    @Builder.Default private Double avaliacaoMedia = 0.0;
    @Builder.Default private Integer totalAvaliacoes = 0;
    @Builder.Default private Boolean livroDoMes = false;
    @Builder.Default private Boolean disponivel = true;
}

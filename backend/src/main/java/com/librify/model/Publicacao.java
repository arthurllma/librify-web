package com.librify.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "publicacoes")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Publicacao {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String autor;

    private String genero;

    @Column(length = 2000)
    private String descricao;

    private String arquivoUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private Status status = Status.EM_ANALISE;

    @Builder.Default
    private LocalDateTime enviadoEm = LocalDateTime.now();

    public enum Status { EM_ANALISE, APROVADO, REJEITADO }
}

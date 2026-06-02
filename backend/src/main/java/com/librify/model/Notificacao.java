package com.librify.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notificacoes")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Notificacao {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 500)
    private String mensagem;

    private String tipo;

    @Builder.Default
    private Boolean lida = false;

    @Builder.Default
    private LocalDateTime criadoEm = LocalDateTime.now();
}

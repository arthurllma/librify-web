package com.librify.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservas")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Reserva {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "livro_id", nullable = false)
    private Livro livro;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private Status status = Status.RESERVADO;

    @Builder.Default
    private LocalDateTime dataReserva = LocalDateTime.now();

    private LocalDate dataEmprestimo;
    private LocalDate dataDevolucao;

    public enum Status { RESERVADO, EMPRESTADO, DEVOLVIDO, CANCELADO }
}

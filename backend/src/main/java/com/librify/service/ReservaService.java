package com.librify.service;

import com.librify.model.*;
import com.librify.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final UserRepository userRepository;
    private final LivroRepository livroRepository;

    public List<Reserva> historico(String emailUser) {
        User user = userRepository.findByEmail(emailUser)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        return reservaRepository.findByUserId(user.getId());
    }

    public List<Reserva> ativos(String emailUser) {
        User user = userRepository.findByEmail(emailUser)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        return reservaRepository.findByUserIdAndStatus(user.getId(), Reserva.Status.RESERVADO);
    }

    public Reserva reservar(Long livroId, String emailUser) {
        User user = userRepository.findByEmail(emailUser)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        Livro livro = livroRepository.findById(livroId)
                .orElseThrow(() -> new IllegalArgumentException("Livro não encontrado"));

        boolean jaAtivo = reservaRepository.existsByUserIdAndLivroIdAndStatusIn(
                user.getId(), livroId,
                List.of(Reserva.Status.RESERVADO, Reserva.Status.EMPRESTADO));

        if (jaAtivo) throw new IllegalStateException("Você já possui este livro reservado ou emprestado");

        return reservaRepository.save(Reserva.builder().user(user).livro(livro).build());
    }
}

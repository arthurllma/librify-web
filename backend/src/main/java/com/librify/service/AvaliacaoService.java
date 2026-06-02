package com.librify.service;

import com.librify.dto.AvaliacaoDTO;
import com.librify.model.*;
import com.librify.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AvaliacaoService {

    private final AvaliacaoRepository avaliacaoRepository;
    private final LivroRepository livroRepository;
    private final UserRepository userRepository;

    public List<Avaliacao> listarPorLivro(Long livroId) {
        return avaliacaoRepository.findByLivroId(livroId);
    }

    public Avaliacao avaliar(Long livroId, String emailUser, AvaliacaoDTO dto) {
        User user = userRepository.findByEmail(emailUser)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        Livro livro = livroRepository.findById(livroId)
                .orElseThrow(() -> new IllegalArgumentException("Livro não encontrado"));

        Avaliacao avaliacao = avaliacaoRepository
                .findByUserIdAndLivroId(user.getId(), livroId)
                .orElse(Avaliacao.builder().user(user).livro(livro).build());

        avaliacao.setNota(dto.getNota());
        avaliacao.setComentario(dto.getComentario());
        Avaliacao salva = avaliacaoRepository.save(avaliacao);

        Double media = avaliacaoRepository.calcularMedia(livroId);
        long total = avaliacaoRepository.countByLivroId(livroId);
        livro.setAvaliacaoMedia(media != null ? media : 0.0);
        livro.setTotalAvaliacoes((int) total);
        livroRepository.save(livro);

        return salva;
    }
}

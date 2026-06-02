package com.librify.service;

import com.librify.dto.PublicacaoDTO;
import com.librify.model.*;
import com.librify.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PublicacaoService {

    private final PublicacaoRepository publicacaoRepository;
    private final UserRepository userRepository;

    public List<Publicacao> minhasPublicacoes(String emailUser) {
        User user = userRepository.findByEmail(emailUser)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        return publicacaoRepository.findByUserId(user.getId());
    }

    public Publicacao enviar(String emailUser, PublicacaoDTO dto) {
        User user = userRepository.findByEmail(emailUser)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        return publicacaoRepository.save(Publicacao.builder()
                .user(user).titulo(dto.getTitulo()).autor(dto.getAutor())
                .genero(dto.getGenero()).descricao(dto.getDescricao())
                .arquivoUrl(dto.getArquivoUrl())
                .build());
    }

    public List<Publicacao> pendentes() {
        return publicacaoRepository.findByStatus(Publicacao.Status.EM_ANALISE);
    }

    public Publicacao avaliar(Long id, String status) {
        Publicacao pub = publicacaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Publicação não encontrada"));
        pub.setStatus(Publicacao.Status.valueOf(status));
        return publicacaoRepository.save(pub);
    }
}

package com.librify.repository;

import com.librify.model.Publicacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PublicacaoRepository extends JpaRepository<Publicacao, Long> {
    List<Publicacao> findByUserId(Long userId);
    List<Publicacao> findByStatus(Publicacao.Status status);
}

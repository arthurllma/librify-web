package com.librify.repository;

import com.librify.model.Notificacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificacaoRepository extends JpaRepository<Notificacao, Long> {
    List<Notificacao> findByUserIdOrderByCriadoEmDesc(Long userId);
    long countByUserIdAndLidaFalse(Long userId);
}

package com.librify.repository;

import com.librify.model.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    List<Avaliacao> findByLivroId(Long livroId);
    Optional<Avaliacao> findByUserIdAndLivroId(Long userId, Long livroId);
    long countByLivroId(Long livroId);

    @Query("SELECT AVG(a.nota) FROM Avaliacao a WHERE a.livro.id = :livroId")
    Double calcularMedia(Long livroId);
}

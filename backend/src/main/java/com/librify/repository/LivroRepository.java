package com.librify.repository;

import com.librify.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface LivroRepository extends JpaRepository<Livro, Long> {
    List<Livro> findByTituloContainingIgnoreCaseOrAutorContainingIgnoreCase(String titulo, String autor);
    List<Livro> findByCategoriaIgnoreCase(String categoria);
    Optional<Livro> findByLivroDoMesTrue();
}

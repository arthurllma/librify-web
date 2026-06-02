package com.librify.repository;

import com.librify.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByUserId(Long userId);
    List<Reserva> findByUserIdAndStatus(Long userId, Reserva.Status status);
    boolean existsByUserIdAndLivroIdAndStatusIn(Long userId, Long livroId, List<Reserva.Status> statuses);
}

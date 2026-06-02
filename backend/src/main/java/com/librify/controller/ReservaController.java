package com.librify.controller;

import com.librify.model.Reserva;
import com.librify.service.ReservaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reservas")
@RequiredArgsConstructor
public class ReservaController {

    private final ReservaService reservaService;

    @GetMapping("/historico")
    public ResponseEntity<List<Reserva>> historico(Authentication auth) {
        return ResponseEntity.ok(reservaService.historico(auth.getName()));
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<Reserva>> ativos(Authentication auth) {
        return ResponseEntity.ok(reservaService.ativos(auth.getName()));
    }

    @PostMapping("/livro/{livroId}")
    public ResponseEntity<?> reservar(@PathVariable Long livroId, Authentication auth) {
        try {
            return ResponseEntity.ok(reservaService.reservar(livroId, auth.getName()));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }
}

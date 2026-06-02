package com.librify.controller;

import com.librify.model.Notificacao;
import com.librify.service.NotificacaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notificacoes")
@RequiredArgsConstructor
public class NotificacaoController {

    private final NotificacaoService notificacaoService;

    @GetMapping
    public ResponseEntity<List<Notificacao>> listar(Authentication auth) {
        return ResponseEntity.ok(notificacaoService.listar(auth.getName()));
    }

    @GetMapping("/nao-lidas")
    public ResponseEntity<Map<String, Long>> naoLidas(Authentication auth) {
        return ResponseEntity.ok(Map.of("total", notificacaoService.contarNaoLidas(auth.getName())));
    }

    @PutMapping("/marcar-lidas")
    public ResponseEntity<?> marcarLidas(Authentication auth) {
        notificacaoService.marcarTodasLidas(auth.getName());
        return ResponseEntity.ok(Map.of("mensagem", "Notificações marcadas como lidas"));
    }
}

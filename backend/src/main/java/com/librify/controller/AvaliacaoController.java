package com.librify.controller;

import com.librify.dto.AvaliacaoDTO;
import com.librify.model.Avaliacao;
import com.librify.service.AvaliacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/avaliacoes")
@RequiredArgsConstructor
public class AvaliacaoController {

    private final AvaliacaoService avaliacaoService;

    @GetMapping("/livro/{livroId}")
    public ResponseEntity<List<Avaliacao>> listar(@PathVariable Long livroId) {
        return ResponseEntity.ok(avaliacaoService.listarPorLivro(livroId));
    }

    @PostMapping("/livro/{livroId}")
    public ResponseEntity<Avaliacao> avaliar(@PathVariable Long livroId,
                                              Authentication auth,
                                              @Valid @RequestBody AvaliacaoDTO dto) {
        return ResponseEntity.ok(avaliacaoService.avaliar(livroId, auth.getName(), dto));
    }
}

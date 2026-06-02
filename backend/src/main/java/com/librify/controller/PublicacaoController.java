package com.librify.controller;

import com.librify.dto.PublicacaoDTO;
import com.librify.model.Publicacao;
import com.librify.service.PublicacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/publicacoes")
@RequiredArgsConstructor
public class PublicacaoController {

    private final PublicacaoService publicacaoService;

    @GetMapping("/minhas")
    public ResponseEntity<List<Publicacao>> minhas(Authentication auth) {
        return ResponseEntity.ok(publicacaoService.minhasPublicacoes(auth.getName()));
    }

    @PostMapping
    public ResponseEntity<Publicacao> enviar(Authentication auth,
                                              @Valid @RequestBody PublicacaoDTO dto) {
        return ResponseEntity.ok(publicacaoService.enviar(auth.getName(), dto));
    }
}

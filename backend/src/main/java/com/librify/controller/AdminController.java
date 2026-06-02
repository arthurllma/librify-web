package com.librify.controller;

import com.librify.dto.LivroDTO;
import com.librify.model.*;
import com.librify.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final LivroService livroService;
    private final PublicacaoService publicacaoService;

    // RF19 – Gestão de livros
    @PostMapping("/livros")
    public ResponseEntity<Livro> cadastrar(@RequestBody LivroDTO dto) {
        return ResponseEntity.ok(livroService.criar(dto));
    }

    @PutMapping("/livros/{id}")
    public ResponseEntity<Livro> editar(@PathVariable Long id, @RequestBody LivroDTO dto) {
        return ResponseEntity.ok(livroService.editar(id, dto));
    }

    @DeleteMapping("/livros/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        livroService.excluir(id);
        return ResponseEntity.ok(Map.of("mensagem", "Livro excluído com sucesso"));
    }

    // RF20 – Aprovação de publicações
    @GetMapping("/publicacoes/pendentes")
    public ResponseEntity<List<Publicacao>> pendentes() {
        return ResponseEntity.ok(publicacaoService.pendentes());
    }

    @PutMapping("/publicacoes/{id}/status")
    public ResponseEntity<Publicacao> avaliar(@PathVariable Long id,
                                               @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(publicacaoService.avaliar(id, body.get("status")));
    }

    // RF21 – Livro do mês
    @PutMapping("/livros/{id}/livro-do-mes")
    public ResponseEntity<?> definirLivroDoMes(@PathVariable Long id) {
        livroService.definirLivroDoMes(id);
        return ResponseEntity.ok(Map.of("mensagem", "Livro do mês definido com sucesso"));
    }
}

package com.librify.controller;

import com.librify.model.Livro;
import com.librify.service.LivroService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livros")
@RequiredArgsConstructor
public class LivroController {

    private final LivroService livroService;

    @GetMapping
    public ResponseEntity<List<Livro>> listar(
            @RequestParam(required = false) String busca,
            @RequestParam(required = false) String categoria) {
        if (busca != null) return ResponseEntity.ok(livroService.buscar(busca));
        if (categoria != null) return ResponseEntity.ok(livroService.filtrarCategoria(categoria));
        return ResponseEntity.ok(livroService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livro> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(livroService.buscarPorId(id));
    }

    @GetMapping("/livro-do-mes")
    public ResponseEntity<Livro> livroDoMes() {
        Livro livro = livroService.livroDoMes();
        return livro != null ? ResponseEntity.ok(livro) : ResponseEntity.noContent().build();
    }
}

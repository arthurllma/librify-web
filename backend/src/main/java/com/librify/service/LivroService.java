package com.librify.service;

import com.librify.dto.LivroDTO;
import com.librify.model.Livro;
import com.librify.repository.LivroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LivroService {

    private final LivroRepository livroRepository;

    public List<Livro> listarTodos() {
        return livroRepository.findAll();
    }

    public Livro buscarPorId(Long id) {
        return livroRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Livro não encontrado"));
    }

    public List<Livro> buscar(String query) {
        return livroRepository.findByTituloContainingIgnoreCaseOrAutorContainingIgnoreCase(query, query);
    }

    public List<Livro> filtrarCategoria(String categoria) {
        return livroRepository.findByCategoriaIgnoreCase(categoria);
    }

    public Livro livroDoMes() {
        return livroRepository.findByLivroDoMesTrue().orElse(null);
    }

    public Livro criar(LivroDTO dto) {
        return livroRepository.save(Livro.builder()
                .titulo(dto.getTitulo()).autor(dto.getAutor())
                .descricao(dto.getDescricao()).categoria(dto.getCategoria())
                .capaUrl(dto.getCapaUrl()).arquivoPdfUrl(dto.getArquivoPdfUrl())
                .build());
    }

    public Livro editar(Long id, LivroDTO dto) {
        Livro livro = buscarPorId(id);
        livro.setTitulo(dto.getTitulo());
        livro.setAutor(dto.getAutor());
        livro.setDescricao(dto.getDescricao());
        livro.setCategoria(dto.getCategoria());
        livro.setCapaUrl(dto.getCapaUrl());
        livro.setArquivoPdfUrl(dto.getArquivoPdfUrl());
        return livroRepository.save(livro);
    }

    public void excluir(Long id) {
        livroRepository.deleteById(id);
    }

    public void definirLivroDoMes(Long id) {
        livroRepository.findByLivroDoMesTrue().ifPresent(l -> {
            l.setLivroDoMes(false);
            livroRepository.save(l);
        });
        Livro livro = buscarPorId(id);
        livro.setLivroDoMes(true);
        livroRepository.save(livro);
    }
}

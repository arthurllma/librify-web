package com.librify.service;

import com.librify.model.*;
import com.librify.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificacaoService {

    private final NotificacaoRepository notificacaoRepository;
    private final UserRepository userRepository;

    public List<Notificacao> listar(String emailUser) {
        User user = userRepository.findByEmail(emailUser)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        return notificacaoRepository.findByUserIdOrderByCriadoEmDesc(user.getId());
    }

    public long contarNaoLidas(String emailUser) {
        User user = userRepository.findByEmail(emailUser)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        return notificacaoRepository.countByUserIdAndLidaFalse(user.getId());
    }

    public void marcarTodasLidas(String emailUser) {
        User user = userRepository.findByEmail(emailUser)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        List<Notificacao> naoLidas = notificacaoRepository
                .findByUserIdOrderByCriadoEmDesc(user.getId())
                .stream().filter(n -> !n.getLida()).toList();
        naoLidas.forEach(n -> n.setLida(true));
        notificacaoRepository.saveAll(naoLidas);
    }

    public void enviar(User user, String mensagem, String tipo) {
        notificacaoRepository.save(Notificacao.builder()
                .user(user).mensagem(mensagem).tipo(tipo).build());
    }
}

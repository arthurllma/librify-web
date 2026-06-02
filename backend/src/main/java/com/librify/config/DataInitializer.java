package com.librify.config;

import com.librify.model.Livro;
import com.librify.model.User;
import com.librify.repository.LivroRepository;
import com.librify.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final LivroRepository livroRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        criarUsuarios();
        criarLivros();
    }

    private void criarUsuarios() {
        if (!userRepository.existsByEmail("admin@librify.com")) {
            userRepository.save(User.builder()
                    .nome("Administrador")
                    .email("admin@librify.com")
                    .senha(passwordEncoder.encode("Admin123"))
                    .role(User.Role.ADMIN)
                    .build());
        }
        if (!userRepository.existsByEmail("user@librify.com")) {
            userRepository.save(User.builder()
                    .nome("João Silva")
                    .email("user@librify.com")
                    .senha(passwordEncoder.encode("User123!"))
                    .build());
        }
    }

    private void criarLivros() {
        if (livroRepository.count() == 0) {
            livroRepository.save(Livro.builder()
                    .titulo("Dom Casmurro")
                    .autor("Machado de Assis")
                    .descricao("Uma das obras mais importantes da literatura brasileira. Bentinho narra sua história de amor com Capitu.")
                    .categoria("Literatura Brasileira")
                    .capaUrl("https://via.placeholder.com/120x180/1A73E8/FFFFFF?text=Dom+Casmurro")
                    .avaliacaoMedia(4.5)
                    .totalAvaliacoes(128)
                    .livroDoMes(true)
                    .build());
            livroRepository.save(Livro.builder()
                    .titulo("O Alquimista")
                    .autor("Paulo Coelho")
                    .descricao("A jornada de Santiago em busca de seu tesouro pessoal e seu destino.")
                    .categoria("Ficção")
                    .capaUrl("https://via.placeholder.com/120x180/34A853/FFFFFF?text=O+Alquimista")
                    .avaliacaoMedia(4.7)
                    .totalAvaliacoes(342)
                    .build());
            livroRepository.save(Livro.builder()
                    .titulo("1984")
                    .autor("George Orwell")
                    .descricao("Uma distopia clássica sobre vigilância, controle e resistência.")
                    .categoria("Ficção Científica")
                    .capaUrl("https://via.placeholder.com/120x180/EA4335/FFFFFF?text=1984")
                    .avaliacaoMedia(4.8)
                    .totalAvaliacoes(521)
                    .build());
            livroRepository.save(Livro.builder()
                    .titulo("Memórias Póstumas de Brás Cubas")
                    .autor("Machado de Assis")
                    .descricao("Narrado por um defunto autor, um clássico do realismo brasileiro.")
                    .categoria("Literatura Brasileira")
                    .capaUrl("https://via.placeholder.com/120x180/FBBC04/000000?text=Bras+Cubas")
                    .avaliacaoMedia(4.3)
                    .totalAvaliacoes(89)
                    .build());
            livroRepository.save(Livro.builder()
                    .titulo("Harry Potter e a Pedra Filosofal")
                    .autor("J.K. Rowling")
                    .descricao("O início da saga do jovem bruxo Harry Potter e sua jornada em Hogwarts.")
                    .categoria("Fantasia")
                    .capaUrl("https://via.placeholder.com/120x180/9C27B0/FFFFFF?text=Harry+Potter")
                    .avaliacaoMedia(4.9)
                    .totalAvaliacoes(987)
                    .build());
            livroRepository.save(Livro.builder()
                    .titulo("Sapiens")
                    .autor("Yuval Noah Harari")
                    .descricao("Uma breve história da humanidade desde a pré-história até o presente.")
                    .categoria("História")
                    .capaUrl("https://via.placeholder.com/120x180/00BCD4/FFFFFF?text=Sapiens")
                    .avaliacaoMedia(4.6)
                    .totalAvaliacoes(445)
                    .build());
        }
    }
}

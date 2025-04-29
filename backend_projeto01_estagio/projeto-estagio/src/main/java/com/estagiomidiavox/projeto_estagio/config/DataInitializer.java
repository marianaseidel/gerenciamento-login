package com.estagiomidiavox.projeto_estagio.config;

import com.estagiomidiavox.projeto_estagio.model.Ramal;
import com.estagiomidiavox.projeto_estagio.model.Usuario;
import com.estagiomidiavox.projeto_estagio.repository.RamalRepository;
import com.estagiomidiavox.projeto_estagio.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(RamalRepository ramalRepository) {
        return args -> {
            if (ramalRepository.count() == 0) {
                for (int i = 1001; i <= 1200; i++) {
                    Ramal ramal = new Ramal();
                    ramal.setNumero(String.valueOf(i));
                    ramal.setStatus("inativo");
                    ramal.setUsuarioLogado(null);
                    ramalRepository.save(ramal);
                }
                System.out.println("✅ 200 ramais criados com sucesso!");
            } else {
                System.out.println("ℹ️ Ramais já existentes no banco. Nenhum dado inserido.");
            }
        };
    }

    @Bean
    CommandLineRunner initDatabaseUsers(UsuarioRepository usuarioRepository) {
        return args -> {
            if (usuarioRepository.count() == 0) {
                List<String> nomes = List.of(
                        "Ana Souza", "João Silva", "Maria Oliveira", "Carlos Lima", "Fernanda Costa",
                        "Bruno Rocha", "Juliana Ribeiro", "Paulo Mendes", "Camila Martins", "Ricardo Alves",
                        "Tatiane Dias", "Felipe Moreira", "Larissa Pinto", "Gabriel Teixeira", "Aline Duarte",
                        "Eduardo Barbosa", "Bianca Nunes", "Thiago Gomes", "Priscila Fernandes", "Diego Carvalho"
                );

                for (int i = 1; i <= 20; i++) {
                    Usuario usuario = new Usuario();
                    usuario.setNome("Usuário " + i);
                    usuario.setNome(nomes.get(i));
                    usuarioRepository.save(usuario);
                }
                System.out.println("✅ 20 usuários cadastrados com sucesso!");
            } else {
                System.out.println("ℹ️ Usuários já existentes no banco. Nenhum dado inserido.");
            }
        };
    };
}

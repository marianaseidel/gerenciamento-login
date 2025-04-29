package com.estagiomidiavox.projeto_estagio.service;

import com.estagiomidiavox.projeto_estagio.model.Usuario;
import com.estagiomidiavox.projeto_estagio.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Optional<Usuario> buscarPorNome(String nome) {
        return usuarioRepository.findByNome(nome);
    }
}


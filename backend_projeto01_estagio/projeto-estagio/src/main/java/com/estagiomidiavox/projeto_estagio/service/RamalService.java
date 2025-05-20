package com.estagiomidiavox.projeto_estagio.service;

import com.estagiomidiavox.projeto_estagio.model.Ramal;
import com.estagiomidiavox.projeto_estagio.repository.RamalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RamalService {

    @Autowired
    private RamalRepository ramalRepository;

    public List<Ramal> listarTodos() {
        return ramalRepository.findAll();
    }

    public Optional<Ramal> buscarPorId(Long id) {
        return ramalRepository.findById(id);
    }

    public Ramal salvar(Ramal ramal) {
        return ramalRepository.save(ramal);
    }

    public Optional<Ramal> buscarRamalDisponivel() {
        return ramalRepository.findFirstByStatusIgnoreCase("inativo");
    }

    public Optional<Ramal> buscarPorNumero(String numero) {
        return ramalRepository.findByNumero(numero);
    }

    public List<Ramal> listarRamaisDisponiveis() {
        return ramalRepository.findByUsuarioLogadoIsNull();
    }

    public List<Ramal> listarRamaisIndisponiveis() {
        return ramalRepository.findByUsuarioLogadoIsNotNullAndStatus("ativo");
    }

    public List<Ramal> listarTodosRamais() {
        return ramalRepository.findAll();
    }

    public Optional<Ramal> buscarRamalAtivoPorEmail(String email) {
        return ramalRepository.findByEmailAndStatus(email, "ativo");
    }

    public List<Ramal> buscarPorTermo(String termo) {
        return ramalRepository.findByUsuarioLogadoContainingIgnoreCaseOrNumeroContaining(termo, termo);
    }

}


package com.estagiomidiavox.projeto_estagio.controller;

import com.estagiomidiavox.projeto_estagio.model.Ramal;
import com.estagiomidiavox.projeto_estagio.service.RamalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("/extensions")
public class ExtensionController {

    @Autowired
    private RamalService ramalService;
    private Integer intervaloInicio = null;
    private Integer intervaloFim = null;
    private boolean intervaloConfigurado = false;


    @GetMapping("/available")
    public ResponseEntity<?> buscarRamalDisponivel() {
        Optional<Ramal> ramalDisponivel = ramalService.buscarRamalDisponivel();
        if (ramalDisponivel.isPresent()) {
            return ResponseEntity.ok(Map.of("extension", ramalDisponivel.get().getNumero()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum ramal disponível.");
        }
    }

    @GetMapping("/all")
    public List<Ramal> getTodosRamais() {
        List<Ramal> todosRamais = ramalService.listarTodosRamais();
        if (intervaloConfigurado && intervaloInicio != null && intervaloFim != null) {
            return todosRamais.stream()
                    .filter(ramal -> {
                        try {
                            int numero = Integer.parseInt(ramal.getNumero());
                            return numero >= intervaloInicio && numero <= intervaloFim;
                        } catch (NumberFormatException e) {
                            return false;
                        }
                    })
                    .toList();
        } else {
            return todosRamais;
        }
    }

    @GetMapping("/available-all")
    public ResponseEntity<?> listarRamaisDisponiveis() {
        List<Ramal> ramaisDisponiveis = ramalService.listarRamaisDisponiveis();
        return ResponseEntity.ok(ramaisDisponiveis);
    }

    @GetMapping("/unavailable-all")
    public ResponseEntity<?> listarRamaisIndisponiveis() {
        List<Ramal> ramaisIndisponiveis = ramalService.listarRamaisIndisponiveis();
        return ResponseEntity.ok(ramaisIndisponiveis);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginRamal(@RequestBody Map<String, String> dados) {
        String usuario = dados.get("usuario");
        String extension = dados.get("extension");
        String email = dados.get("email");

        Optional<Ramal> optionalRamal = ramalService.buscarPorNumero(extension);
        if (optionalRamal.isPresent()) {
            Ramal ramal = optionalRamal.get();
            if (ramal.getStatus().equalsIgnoreCase("inativo")) {
                ramal.setUsuarioLogado(usuario);
                ramal.setEmail(email);
                ramal.setStatus("ativo");
                ramalService.salvar(ramal);
                return ResponseEntity.ok("Ramal logado com sucesso.");
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Ramal já está em uso.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ramal não encontrado.");
        }
    }

    @DeleteMapping("/logout/{extension}")
    public ResponseEntity<?> deslogarRamal(@PathVariable String extension) {
        Optional<Ramal> optionalRamal = ramalService.buscarPorNumero(extension);
        if (optionalRamal.isPresent()) {
            Ramal ramal = optionalRamal.get();
            ramal.setUsuarioLogado(null);
            ramal.setEmail(null);
            ramal.setStatus("inativo");
            ramalService.salvar(ramal);
            return ResponseEntity.ok("Ramal deslogado com sucesso.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ramal não encontrado.");
        }
    }

    @PostMapping("/configurar-intervalo")
    public ResponseEntity<?> configurarIntervalo(@RequestBody Map<String, Integer> intervalo) {
        this.intervaloInicio = intervalo.get("inicio");
        this.intervaloFim = intervalo.get("fim");
        this.intervaloConfigurado = true;
        Map<String, String> response = new HashMap<>();
        response.put("message", "Intervalo configurado com sucesso.");
        return ResponseEntity.ok(response);    }
}


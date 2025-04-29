package com.estagiomidiavox.projeto_estagio.repository;

import com.estagiomidiavox.projeto_estagio.model.Ramal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface RamalRepository extends JpaRepository<Ramal, Long> {
    Optional<Ramal> findFirstByStatusIgnoreCase(String status);
    Optional<Ramal> findByNumero(String numero);

    List<Ramal> findByUsuarioLogadoIsNull();
    List<Ramal> findByUsuarioLogadoIsNotNullAndStatus(String status);
    boolean existsByEmail(String email);

}

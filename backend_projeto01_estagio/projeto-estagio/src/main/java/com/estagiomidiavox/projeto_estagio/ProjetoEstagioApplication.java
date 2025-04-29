package com.estagiomidiavox.projeto_estagio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.estagiomidiavox.projeto_estagio")

public class ProjetoEstagioApplication {

	public static void main(String[] args) {

		SpringApplication.run(ProjetoEstagioApplication.class, args);
	}

}

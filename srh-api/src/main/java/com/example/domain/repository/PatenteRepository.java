package com.example.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.domain.entity.Patente;
import com.example.domain.entity.enums.CategoriaPatenteEnum;

public interface PatenteRepository extends JpaRepository<Patente, Long>{
	
	public List<Patente> findByCategoria(CategoriaPatenteEnum categoria);
	
}

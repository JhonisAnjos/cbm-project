package com.example.domain.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.domain.entity.Patente;
import com.example.domain.entity.enums.CategoriaPatenteEnum;
import com.example.domain.exception.ObjectNotFoundException;
import com.example.domain.repository.PatenteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PatenteService {
	
	private static String PATENTE_NOT_FOUND_MSG = "Patente com id: %d não encontrada";

	private final PatenteRepository patenteRepository;
	
	public List<Patente> findByCategoria(String categoria){
		return this.patenteRepository.findByCategoria(CategoriaPatenteEnum.valueOf(categoria));
	}
	
	public List<Patente> findAll(){
		return this.patenteRepository.findAll();
	}
	
	public Patente findById(Long id) {
		return this.patenteRepository.findById(id)
				.orElseThrow(
						()-> new ObjectNotFoundException(String.format(PATENTE_NOT_FOUND_MSG, id)));
	}
}

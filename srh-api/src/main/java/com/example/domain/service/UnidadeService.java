package com.example.domain.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.domain.entity.Unidade;
import com.example.domain.exception.ObjectNotFoundException;
import com.example.domain.repository.UnidadeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UnidadeService {
	
	private static String UNIDADE_NOT_FOUND_MSG = "Unidade com id: %d não encontrada";
	
	private final UnidadeRepository unidadeRepository;
	
	public List<Unidade> findAll(){
		return this.unidadeRepository.findAll();
	}
	
	public Unidade findById(Long id) {
		return this.unidadeRepository.findById(id)
				.orElseThrow(
						()-> new ObjectNotFoundException(String.format(UNIDADE_NOT_FOUND_MSG, id)));
	}

}

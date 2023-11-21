package com.example.web.model;

import com.example.domain.entity.enums.CategoriaPatenteEnum;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatenteModel{

	private Long id;
	
	private String nome;
	
	private String sigla;
	
	private CategoriaPatenteEnum categoria;
	
}

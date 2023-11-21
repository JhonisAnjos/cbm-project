package com.example.web.model;

import java.time.LocalDate;

import com.example.domain.entity.enums.SexoEnum;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BombeiroMilitarModel{

	private Long id;
	
	private String nome;
	
	private LocalDate dataNascimento;
	
	private SexoEnum sexo;
	
	private String cpf;
	
	private String telefone;
	
	private String email;

	private PatenteModel patente;
	
	private UnidadeModel unidade;

	private EnderecoModel endereco;
}

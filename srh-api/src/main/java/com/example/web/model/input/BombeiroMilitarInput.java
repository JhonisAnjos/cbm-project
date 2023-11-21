package com.example.web.model.input;

import java.time.LocalDate;

import com.example.domain.entity.enums.SexoEnum;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BombeiroMilitarInput{
	
	private String nome;
	
	private LocalDate dataNascimento;
	
	private SexoEnum sexo;
	
	private String cpf;
	
	private String telefone;
	
	private String email;

	private Long patenteId;
	
	private Long unidadeId;

	private EnderecoInput endereco;
	
}

package com.example.web.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnderecoModel{
	
	private Long id;
	
	private String logradouro;
	
	private Integer numero;
	
	private String bairro;
	
	private String cidade;
	
	private String estado;
	
	private String cep;

}

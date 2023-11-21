package com.example.web.model.input;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnderecoInput{
	
	private String logradouro;
	
	private Integer numero;
	
	private String bairro;
	
	private String cidade;
	
	private String estado;
	
	private String cep;

}

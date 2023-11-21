package com.example.web.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.domain.entity.Unidade;
import com.example.domain.service.UnidadeService;
import com.example.web.assembler.GenericAssembler;
import com.example.web.model.UnidadeModel;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "/unidades")
@RequiredArgsConstructor
public class UnidadeController {

	private final UnidadeService unidadeService;
	
	private final GenericAssembler<Unidade, UnidadeModel> unidadeModelAssembler;
	
	@GetMapping
	@ResponseStatus(code = HttpStatus.OK)
	public List<UnidadeModel> findAll(){
		
		List<Unidade> entityList = this.unidadeService.findAll();
		
		return this.unidadeModelAssembler.convertToModelList(entityList, UnidadeModel.class);
	}
	
}

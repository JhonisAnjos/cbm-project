package com.example.web.controller;

import java.util.List;
import java.util.Objects;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.domain.entity.Patente;
import com.example.domain.service.PatenteService;
import com.example.web.assembler.GenericAssembler;
import com.example.web.model.PatenteModel;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "/patentes")
@RequiredArgsConstructor
public class PatenteController {
	
	private final PatenteService patenteService;
	
	private final GenericAssembler<Patente, PatenteModel> patenteModelAssembler;
	
	@GetMapping
	@ResponseStatus(code = HttpStatus.OK)
	public List<PatenteModel> findByCategoria(@RequestParam(required = false) String categoria){
		
		List<Patente> entityList = Objects.isNull(categoria)?this.patenteService.findAll()
				:this.patenteService.findByCategoria(categoria);
		
		return this.patenteModelAssembler.convertToModelList(entityList, PatenteModel.class);
	}

}

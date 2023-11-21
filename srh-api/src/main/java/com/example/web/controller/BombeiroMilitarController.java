package com.example.web.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.domain.entity.BombeiroMilitar;
import com.example.domain.service.BombeiroMilitarService;
import com.example.web.assembler.GenericAssembler;
import com.example.web.model.BombeiroMilitarModel;
import com.example.web.model.input.BombeiroMilitarInput;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "/bombeiros")
@RequiredArgsConstructor
public class BombeiroMilitarController {
	
	private final BombeiroMilitarService bombeiroMilitarService;
	
	private final GenericAssembler<BombeiroMilitar, BombeiroMilitarModel> bombeiroModelAssembler;
	
	@PostMapping
	@ResponseStatus(code = HttpStatus.CREATED)
	public BombeiroMilitarModel save(@RequestBody BombeiroMilitarInput input) {
		
		BombeiroMilitar entity = this.bombeiroMilitarService.save(input);
		
		return this.bombeiroModelAssembler.convertToModel(entity, BombeiroMilitarModel.class);
	}
	
	@GetMapping
	@ResponseStatus(code = HttpStatus.OK)
	public List<BombeiroMilitarModel> findAll(){
		List<BombeiroMilitar> entityList = this.bombeiroMilitarService.findAll();
		
		return this.bombeiroModelAssembler.convertToModelList(entityList, BombeiroMilitarModel.class);
		
	}
	
	@DeleteMapping(path = "/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void deleteById(@PathVariable Long id) {
		this.bombeiroMilitarService.deleteById(id);
	}
	
	@PutMapping(path = "/{id}")
	@ResponseStatus(code = HttpStatus.OK)
	public BombeiroMilitarModel update(@PathVariable Long id, @RequestBody BombeiroMilitarInput input) {
		
		BombeiroMilitar entity = this.bombeiroMilitarService.update(id, input);
		
		return this.bombeiroModelAssembler.convertToModel(entity, BombeiroMilitarModel.class);
	}
}

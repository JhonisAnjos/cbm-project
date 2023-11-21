package com.example.web.assembler;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GenericAssembler<E, M> {

	@Autowired
	private ModelMapper modelMapper;

	public M convertToModel(E entity, Class<M> modelClass) {
		return this.modelMapper.map(entity, modelClass);
	}

	public List<M> convertToModelList(List<E> entityList, Class<M> modelClass) {
		return entityList.stream().map(entity -> convertToModel(entity, modelClass)).collect(Collectors.toList());
	}

}

package com.example.domain.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.example.domain.entity.BombeiroMilitar;
import com.example.domain.entity.Endereco;
import com.example.domain.entity.Patente;
import com.example.domain.entity.Unidade;
import com.example.domain.exception.ObjectNotFoundException;
import com.example.domain.repository.BombeiroMilitarRepository;
import com.example.web.model.input.BombeiroMilitarInput;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BombeiroMilitarService {
	
	private static String BOMBEIRO_NOT_FOUND_MSG = "Bombeiro com id: %d não encontrado";
	
	private final BombeiroMilitarRepository bombeiroMilitarRepository;
	
	private final UnidadeService unidadeService;
	
	private final PatenteService patenteService;
	
	@Transactional
	public void deleteById(Long id) {
		try {
			this.bombeiroMilitarRepository.deleteById(id);			
		} catch (EmptyResultDataAccessException e) {
			throw new ObjectNotFoundException(String.format(BOMBEIRO_NOT_FOUND_MSG, id));
		}
	}
	
	public List<BombeiroMilitar> findAll(){
		return this.bombeiroMilitarRepository.findAll();
	}
	
	@Transactional
	public BombeiroMilitar save(BombeiroMilitarInput input) {
		
		BombeiroMilitar bombeiro = builderEntity(input);
		
		return this.bombeiroMilitarRepository.save(bombeiro);
	}
	
	@Transactional
	public BombeiroMilitar update(Long id, BombeiroMilitarInput input) {
		
		BombeiroMilitar bombeiro = this.findById(id);
		
		updateFields(input, bombeiro);
		
		return bombeiro;
	}
	
	public BombeiroMilitar findById(Long id) {
		return this.bombeiroMilitarRepository.findById(id)
				.orElseThrow(
						()-> new ObjectNotFoundException(String.format(BOMBEIRO_NOT_FOUND_MSG, id)));
	}

	@Transactional
	private void updateFields(BombeiroMilitarInput input, BombeiroMilitar entity) {
		Unidade unidade = this.unidadeService.findById(input.getUnidadeId());
		
		Patente patente = this.patenteService.findById(input.getPatenteId());
		
		//BOMBEIRO
		entity.setNome(input.getNome());
		entity.setDataNascimento(input.getDataNascimento());
		entity.setCpf(input.getCpf());
		entity.setSexo(input.getSexo());
		entity.setTelefone(input.getTelefone());
		entity.setEmail(input.getEmail());
		entity.setPatente(patente);
		entity.setUnidade(unidade);
		//ENDEREÇO
		entity.getEndereco().setLogradouro(input.getEndereco().getLogradouro());
		entity.getEndereco().setNumero(input.getEndereco().getNumero());
		entity.getEndereco().setCidade(input.getEndereco().getCidade());
		entity.getEndereco().setEstado(input.getEndereco().getEstado());
		entity.getEndereco().setBairro(input.getEndereco().getBairro());
		entity.getEndereco().setCep(input.getEndereco().getCep());
	}

	private BombeiroMilitar builderEntity(BombeiroMilitarInput input) {
		Unidade unidade = this.unidadeService.findById(input.getUnidadeId());
		
		Patente patente = this.patenteService.findById(input.getPatenteId());
		
		BombeiroMilitar bombeiro = BombeiroMilitar.builder()
			.nome(input.getNome())
			.dataNascimento(input.getDataNascimento())
			.cpf(input.getCpf())
			.sexo(input.getSexo())
			.telefone(input.getTelefone())
			.email(input.getEmail())
			.patente(patente)
			.unidade(unidade)
			.endereco(Endereco.builder()
					.logradouro(input.getEndereco().getLogradouro())
					.numero(input.getEndereco().getNumero())
					.cidade(input.getEndereco().getCidade())
					.estado(input.getEndereco().getEstado())
					.bairro(input.getEndereco().getBairro())
					.cep(input.getEndereco().getCep()).build())
			.build();
		return bombeiro;
	}

}

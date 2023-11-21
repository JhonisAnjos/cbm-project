import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import BombeiroService from '../service/BombeiroService';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';
import PatenteService from '../service/PatenteService';
import UnidadeService from '../service/UnidadeService';
import { Divider } from 'primereact/divider';
import ViaCepService from '../service/ViaCepService';

export const GerenciarBombeirosPage = () => {

    const sexos = [
        {nome: 'Masculino', value: 'M'},
        {nome: 'Feminino', value: 'F'}
    ]

    let emptyBombeiro = {
        nome: '',
        dataNascimento: null,
        sexo: '',
        cpf: '',
        telefone: '',
        email: '',
        patenteId: null,
        unidadeId: null,
        endereco:{
            logradouro: '',
            numero: null,
            bairro: '',
            cidade: '',
            estado: '',
            cep: ''
        }
    }


    const [bombeiros, setBombeiros] = useState([]);
    const [bombeiro, setBombeiro] = useState(emptyBombeiro);
    const [patentes, setPatentes] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const bombeiroService = new BombeiroService();
    const patenteService = new PatenteService();
    const unidadeService = new UnidadeService();
    const viaCepService = new ViaCepService();
    const [bombeiroDialog, setBombeiroDialog] = useState(false);
    const [deleteBombeiroDialog, setDeleteBombeiroDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {

        bombeiroService.findAll().then(response => {
            setBombeiros(response.data);
        })
        unidadeService.findAll().then(response => {
            setUnidades(response.data);
        })
        patenteService.findAll().then(response => {
            setPatentes(response.data);
        })
    }, []);

    const openNew = () => {
        setBombeiro(emptyBombeiro);
        setSubmitted(false);
        setBombeiroDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setBombeiroDialog(false);
    }

    const hideDeleteBombeiroDialog = () => {
        setDeleteBombeiroDialog(false);
    }

    const saveBombeiro = () => {
        setSubmitted(true);

        if (bombeiro.nome.trim() || bombeiro.cpf.trim() || bombeiro.endereco.cep.trim()) {
            let _bombeiros = [...bombeiros];
            if (bombeiro.id) {
                const index = findIndexById(bombeiro.id);

                bombeiroService.update(bombeiro).then(response => {
                    let _bombeiro = response.data;
                    _bombeiros[index] = _bombeiro;
                    setBombeiros(_bombeiros);
                    setBombeiroDialog(false);
                    setBombeiro(emptyBombeiro);
                    toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Bombeiro Atualizado', life: 3000 });
                }).catch(error => {
                    toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Contate do Administrador.' });
                });

            }
            else {
                bombeiroService.save(bombeiro).then(response => {
                    _bombeiros.push(response.data);
                    toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Bombeiro Cadastrado.', life: 3000 });
                    setBombeiros(_bombeiros);
                    setBombeiroDialog(false);
                    setBombeiro(emptyBombeiro);
                }).catch(error => {
                    toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Contate do Administrador.' });
                });
            }
        }
    }

    const editBombeiro = (bombeiro) => {
        let _bombeiro = {...bombeiro}
        _bombeiro['dataNascimento'] = new Date(_bombeiro.dataNascimento);
        _bombeiro['unidadeId'] = _bombeiro.unidade.id;
        _bombeiro['patenteId'] = _bombeiro.patente.id;
        setBombeiro(_bombeiro);
        setBombeiroDialog(true);
    }

    const confirmDeleteBombeiro = (bombeiro) => {
        setBombeiro(bombeiro);
        setDeleteBombeiroDialog(true);
    }

    const deleteBombeiro = () => {
        let _bombeiros= bombeiros.filter(val => val.id !== bombeiro.id);
        bombeiroService.deleteById(bombeiro.id).then(response => {
            setBombeiros(_bombeiros);
            toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Bombeiro Excluído', life: 3000 });
        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Erro Inesperado.' });
        })
        setDeleteBombeiroDialog(false);
        setBombeiro(emptyBombeiro);
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < bombeiros.length; i++) {
            if (bombeiros[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }


    const findEnderecoByCep = () =>{
        if(bombeiro.endereco.cep.trim()){
            viaCepService.findEnderecoByCep(bombeiro.endereco.cep).then(response =>{
                let _endereco = response.data;
                if(_endereco.logradouro){
                    let _bombeiro = {...bombeiro}
                    _bombeiro.endereco['logradouro'] = _endereco.logradouro;
                    _bombeiro.endereco['bairro'] = _endereco.bairro;
                    _bombeiro.endereco['cidade'] = _endereco.localidade;
                    _bombeiro.endereco['estado'] = _endereco.uf;
                    setBombeiro(_bombeiro);
                }
            })

        }
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _bombeiro= { ...bombeiro };
        _bombeiro[`${name}`] = val;

        setBombeiro(_bombeiro);
    }
    
    const onEnderecoInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _bombeiro= { ...bombeiro };
        _bombeiro.endereco[`${name}`] = val;

        setBombeiro(_bombeiro);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value;
        let _bombeiro = { ...bombeiro };
        _bombeiro[`${name}`] = val;
        setBombeiro(_bombeiro);
    }

    const onEnderecoInputNumberChange = (e, name) => {
        const val = e.value;
        let _bombeiro = { ...bombeiro };
        _bombeiro.endereco[`${name}`] = val;
        setBombeiro(_bombeiro);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Novo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                </div>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Exportar" icon="pi pi-download" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded mr-2" onClick={() => editBombeiro(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteBombeiro(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gerenciar Bombeiros</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Pesquise..." />
            </span>
        </div>
    );

    const bombeiroDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={saveBombeiro} />
        </>
    );
    const deleteBombeiroDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeleteBombeiroDialog} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteBombeiro} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={bombeiros} dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando de {first} até {last} de {totalRecords} registros"
                        globalFilter={globalFilter} emptyMessage="Nemhum Bombeiro encontrado." header={header}>
                        <Column field="nome" header="Nome" sortable></Column>
                        <Column field="dataNascimento" header="Data de Nascimento" sortable></Column>
                        <Column field="sexo" header="Sexo"  sortable></Column>
                        <Column field="cpf" header="CPF"></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={bombeiroDialog} style={{ width: '720px' }} header={!bombeiro.id?'Cadastrar Bombeiro':'Editar Bombeiro'} modal className="p-fluid" footer={bombeiroDialogFooter} onHide={hideDialog}>
                    <div className="grid formgrid">
                        <div className="field col-6">
                            <label htmlFor="nome">Nome</label>
                            <InputText id="nome" value={bombeiro.nome} onChange={(e) => onInputChange(e, 'nome')} required autoFocus className={classNames({ 'p-invalid': submitted && !bombeiro.nome })} />
                            {submitted && !bombeiro.nome && <small className="p-invalid">Nome é obrigatório.</small>}
                        </div>
                        <div className="field col-6">
                            <label htmlFor="cpf">CPF</label>
                            <InputMask id="cpf" value={bombeiro.cpf} onChange={(e) => onInputChange(e, 'cpf')} required className={classNames({ 'p-invalid': submitted && !bombeiro.cpf })} 
                            mask="999.999.999-99"/>
                            {submitted && !bombeiro.cpf && <small className="p-invalid">CPF é obrigatório.</small>}
                        </div>
                        <div className="field col-6">
                            <label htmlFor="dataNascimento">Data de Nascimento</label>
                            <Calendar id="dataNascimento" value={bombeiro.dataNascimento}
                                onChange={(e) => onInputChange(e, 'dataNascimento')}
                                mask="99/99/9999"
                                locale="br"
                                dateFormat="dd/mm/yy"
                                maxDate={new Date()}
                                monthNavigator
                                yearNavigator
                                yearRange="1950:2023"
                                showIcon/>
                        </div>
                        <div className="field col-6">
                            <label htmlFor="sexo">Sexo</label>
                            <Dropdown value={bombeiro.sexo} 
                            onChange={(e)=> onInputChange(e, 'sexo') } options={sexos} 
                            optionValue="value" optionLabel="nome" forceSelection/>
                        </div>
                        <div className="field col-6">
                            <label htmlFor="telefone">Telefone</label>
                            <InputMask id="telefone" value={bombeiro.telefone} onChange={(e) => onInputChange(e, 'telefone')} required 
                            mask="(99)9999-9999"/>
                        </div>
                        <div className="field col-6">
                            <label htmlFor="email">E-mail</label>
                            <InputText id="email" value={bombeiro.email} onChange={(e) => onInputChange(e, 'email')} required/>
                        </div>
                        <div className="field col-6">
                            <label htmlFor="patente">Patente</label>
                            <Dropdown value={bombeiro.patenteId} 
                            onChange={(e)=> onInputNumberChange(e, 'patenteId') } options={patentes}
                            optionLabel="nome" placeholder='Selecione um item' optionValue="id" forceSelection/>
                        </div>
                        <div className="field col-6">
                            <label htmlFor="unidade">Unidade</label>
                            <Dropdown value={bombeiro.unidadeId} 
                            onChange={(e)=> onInputNumberChange(e, 'unidadeId') } options={unidades}
                            optionLabel="nome" placeholder='Selecione um item' optionValue="id" forceSelection/>
                        </div>
                        <Divider>
                        <div className="inline-flex align-items-center">
                            <b>Endereço</b>
                        </div>
                        </Divider>
                        <div className="field col-3">
                            <label htmlFor="cep">CEP</label>
                            <InputMask id="cep" value={bombeiro.endereco.cep} onChange={(e) => onEnderecoInputChange(e, 'cep')} required className={classNames({ 'p-invalid': submitted && !bombeiro.endereco.cep })} 
                             mask="99.999-999" onBlur={findEnderecoByCep}/>
                            {submitted && !bombeiro.endereco.cep && <small className="p-invalid">CEP é obrigatório.</small>}
                        </div>
                        <div className="field col-7">
                            <label htmlFor="log">Logradouro</label>
                            <InputText id="log" value={bombeiro.endereco.logradouro} onChange={(e) => onEnderecoInputChange(e, 'logradouro')} />
                        </div>
                        <div className="field col-2">
                            <label htmlFor="numero">Número</label>
                            <InputNumber id="numero" value={bombeiro.endereco.numero} onChange={(e) => onEnderecoInputNumberChange(e, 'numero')} />
                        </div>
                        <div className="field col-4">
                            <label htmlFor="bairro">Bairro</label>
                            <InputText id="bairro" value={bombeiro.endereco.bairro} onChange={(e) => onEnderecoInputChange(e, 'bairro')} />
                        </div>
                        <div className="field col-6">
                            <label htmlFor="cidade">Cidade</label>
                            <InputText id="log" value={bombeiro.endereco.cidade} onChange={(e) => onEnderecoInputChange(e, 'cidade')} />
                        </div>
                        <div className="field col-2">
                            <label htmlFor="estado">Estado</label>
                            <InputText id="estado" value={bombeiro.endereco.estado} onChange={(e) => onEnderecoInputChange(e, 'estado')} />
                        </div>
                    </div>
                    </Dialog>

                    <Dialog visible={deleteBombeiroDialog} style={{ width: '450px' }} header="Confirmação" modal footer={deleteBombeiroDialogFooter} onHide={hideDeleteBombeiroDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {bombeiro && <span>Tem certeza de que deseja excluir <b>{bombeiro.nome}</b>?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

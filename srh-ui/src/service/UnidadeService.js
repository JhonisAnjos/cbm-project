import ApiService from "./ApiService";

class UnidadeService extends ApiService{

    constructor(){
        super('/unidades')
    }

    findAll() {
        return this.get('');
    }
}

export default UnidadeService
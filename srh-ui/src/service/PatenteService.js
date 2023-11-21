import ApiService from "./ApiService";

class PatenteService extends ApiService{

    constructor(){
        super('/patentes')
    }

    findAll() {
        return this.get('');
    }
}

export default PatenteService
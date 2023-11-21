import ApiService from "./ApiService";

class BombeiroService extends ApiService{

    constructor(){
        super('/bombeiros')
    }

    findAll() {
        return this.get('');
    }

    deleteById(id){
        return super.delete(`/${id}`);
    }

    save(data){
        return this.post('', data);
    }

    update(data){
        return this.put(`/${data.id}`, data);
    }
}

export default BombeiroService
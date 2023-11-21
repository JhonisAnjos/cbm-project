import axios from 'axios'

const httpClient = axios.create({
    baseURL : 'https://viacep.com.br'
})

class ViaCepService {
 
    findEnderecoByCep(cep){
        let _cep = cep.replace('.','').replace('-','');

        return httpClient.get(`/ws/${_cep}/json`);
    }


}

export default ViaCepService;
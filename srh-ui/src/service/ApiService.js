import axios from 'axios'
import {config} from '../Constants'

export const httpClient = axios.create({
    baseURL : config.url.API_BASE_URL
})

class ApiService {
    constructor(apiurl){
        this.apiurl = apiurl;
    }

    post(url, objeto){
        const requestUrl = `${this.apiurl}${url}`;
        return httpClient.post(requestUrl, objeto);
    }
   
    put(url, objeto){
        const requestUrl = `${this.apiurl}${url}`;
        return httpClient.put(requestUrl, objeto);
    }

    patch(url, objeto){
        const requestUrl = `${this.apiurl}${url}`;
        return httpClient.patch(requestUrl, objeto);
    }

    get(url){
        const requestUrl = `${this.apiurl}${url}`;
        return httpClient.get(requestUrl);
    }

    delete(url){
        const requestUrl = `${this.apiurl}${url}`;
        return httpClient.delete(requestUrl);
    }
}

export default ApiService;
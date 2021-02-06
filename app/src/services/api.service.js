export default class ApiService {
    _apiBase = 'http://127.0.0.1:7000';

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        const body = await res.json();
        return body;
    }

    getAllProducts = async () => {
        // ToDo check it        
        return (await this.getResource('/goods?name=kefir'))
    }

    getAllProductsByGroup = async (GroupName) => {         
        return (await this.getResource(`/goods?name=${GroupName}`))
    }    

    getAllGroups = async () => {
        
        return (await this.getResource('/groups'))
    }    
}
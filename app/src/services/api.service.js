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

    postResource = async (url, sendBody={}) => {

        console.log("postResource", url, sendBody);

        const res = await fetch(
            `${this._apiBase}${url}`, 
            {method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendBody)});
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        const body = await res.json();
        return body;
    }    
    
    deleteResourse = async (url) =>{
        const res = await fetch(`${this._apiBase}${url}`, {method:'DELETE'});
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
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

    getGroupByID = async (GroupName, id) => {         
        return (await this.getResource(`/groups?name=${GroupName}&id=${id}`))
    }    

    GetProductByID = async (id) => {         
        return (await this.getResource(`/groups?id=${id}`))
    }        

    addGroup = async (insObject) => {
        
        const groupName = insObject.name;
        const groupID   = insObject._id ? insObject._id : '';

        return (await this.postResource(`/groups?name=${groupName}&id=${groupID}`))
    }   
        
    addGood = async (groupName, body) => {         
        return (await this.postResource(`/goods?name=${groupName}`, body))
    }       

    deleteGroup = async (id) => {
        return (await this.deleteResourse(`/groups?id=${id}`));
    }
    
    deleteGood = async (groupName, id) => {
        return (await this.deleteResourse(`/goods?name=${groupName}&id=${id}`));
    }
}
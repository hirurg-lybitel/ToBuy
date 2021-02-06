import React from 'react';
import ApiService from "../../services/api.service";
/* components */
import Title from "../title/title.js";
import List from "../list/list.js";
/** styles */
import "./app.css";


class App extends React.Component{
    apiService = new ApiService();

    constructor(props){
        super(props);

        this.state = {    
            title: "",      /** наименование текущего списка */
            listType: 0,    /** 0 - группы товаров, 1 - товары*/
            result: [],
            parent: null    /** родительский элемент списка*/
        };
    }

    componentDidMount(){
        console.log("componentDidMount");
        this.getDataFromDatabase(0, null);           
    }    

    /** нажатие на группу тоаров */
    handleClick(parent){
        this.getDataFromDatabase(1, parent);
    }

    /** кнопка Назад в меню */
    goBackClick(currentListType){

        console.log("====");
        console.log(currentListType, this.state.listType);    
        
        this.getDataFromDatabase(currentListType-1, null);        
    
    }
    
    /** считывание записей из БД */
    getDataFromDatabase(listType, parent){
        console.log("getDataFromDatabase", listType, parent);
        switch (listType) {
            case 0:
                this.apiService.getAllGroups().then((result) =>{
                    this.setState({
                        title: "Список покупок",
                        result: result,
                        listType: listType,
                        parent: null
                    })
                })
                break;
            case 1:            
                this.apiService.getAllProductsByGroup(parent.name).then((result) =>{
                    this.setState({
                        title: parent.displayName, 
                        result: result,
                        listType: listType,
                        parent: null
                    })
                })                
                break;        
            default:
                break;
        }     
    }    

    render(){        
        return(
            <div className="App">
                <div className="Title">                    
                    <Title 
                        text = {this.state.title}
                        listType = {this.state.listType}
                        onClick = {(value)=>this.goBackClick(value)}
                    />
                </div>
                <div className='List'>
                    <List 
                        result={this.state.result}
                        listType = {this.state.listType}
                        onClick = {(parent)=>this.handleClick(parent)}
                    />
                </div>
                <div>                    
                </div>
            </div>

        );
    }
}

export default App;
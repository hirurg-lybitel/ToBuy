import React from 'react';
import ApiService from "../../services/api.service";
/* components */
import Header from "../header/header.js";
import List from "../list/list.js";
/** styles */
import "./app.css";

require('dotenv').config();


class App extends React.Component{
    apiService = new ApiService();

    constructor(props){
        super(props);        

        this.state = {    
            title: "",                                          /** наименование текущего списка */
            listType: process.env.REACT_APP_LIST_TYPE_GROUP,    /** 0 - группы товаров, 1 - товары, 2 - изменение*/
            result: [],
            collection: null,                                   /** текущая коллекция*/
            inputValue: ''  
        };
    }

    componentDidMount(){
        console.log("componentDidMount");
        this.getDataFromDatabase(process.env.REACT_APP_LIST_TYPE_GROUP);           
    }    

    /** нажатие на группу товаров */
    handleClick(group){
        this.getDataFromDatabase(process.env.REACT_APP_LIST_TYPE_GOOD, group);
    }

    /** кнопка Назад в меню */
    goBackClick(currentListType){
        
        console.log("goBackClick", currentListType, this.state.listType);    

        switch (Number(this.state.listType)) {
            case Number(process.env.REACT_APP_LIST_TYPE_GROUP):
            case Number(process.env.REACT_APP_LIST_TYPE_GOOD):
                this.getDataFromDatabase(currentListType-1, this.state.collection);            
                
                break;
            case Number(process.env.REACT_APP_LIST_TYPE_CHANGE_GROUP):
            case Number(process.env.REACT_APP_LIST_TYPE_CHANGE_GOOD):
                this.getDataFromDatabase(currentListType-4, this.state.collection); 
                break;
        
            default:
                break;
        }                
    }

    /** окно добавления/изменения данных */
    setProp(){
        if (this.state.listType == process.env.REACT_APP_LIST_TYPE_CHANGE_GROUP || 
            this.state.listType == process.env.REACT_APP_LIST_TYPE_CHANGE_GOOD) return;        

        console.log("setProp", this.state.listType, this.state.collection);

        let listType=0;
        switch (Number(this.state.listType)) {
            case Number(process.env.REACT_APP_LIST_TYPE_GROUP):
                listType = process.env.REACT_APP_LIST_TYPE_CHANGE_GROUP;
                break;        
            case Number(process.env.REACT_APP_LIST_TYPE_GOOD):
                listType = process.env.REACT_APP_LIST_TYPE_CHANGE_GOOD;
                break;
            default:
                break;
        }
        this.setState({
            listType: listType
        })

        console.log("setProp", this.state.listType, this.state.collection);
    }

    submitOnClick(insObject){
        console.log("submitOnClick", insObject, this.state.listType, this.state.collection) ;

        if (!insObject) return;
        if (!insObject.name) return;            
        
        switch (Number(this.state.listType)) {
            case Number(process.env.REACT_APP_LIST_TYPE_CHANGE_GROUP):                
                this.apiService.addGroup(insObject.name).then((result) =>{
                    console.log("addGroup", result);
                    this.getDataFromDatabase(process.env.REACT_APP_LIST_TYPE_GROUP);
                })      
                break;        
            case Number(process.env.REACT_APP_LIST_TYPE_CHANGE_GOOD):                
                this.apiService.addGood(this.state.collection.name, insObject).then((result) =>{
                    console.log("addGood", result);
                    this.getDataFromDatabase(process.env.REACT_APP_LIST_TYPE_GOOD, this.state.collection);
                })      
                break;
            default:
                break;
        }
/*
        this.apiService.addGroup(groupName).then((result) =>{
            console.log("addGroup", result);
            this.getDataFromDatabase(process.env.REACT_APP_LIST_TYPE_GROUP);
        })      
*/
    }

    setItem(colName){

    }

    deleteOnClick(id){        
        if (!id) return;

        console.log("deleteOnClick", this.state.collection);

        switch (Number(this.state.listType)) {
            case Number(process.env.REACT_APP_LIST_TYPE_GROUP):
                this.apiService.deleteGroup(id).then((result) => {
                    console.log("deleteGroup", result);
                    this.getDataFromDatabase(process.env.REACT_APP_LIST_TYPE_GROUP);
                });                
                break;
            case Number(process.env.REACT_APP_LIST_TYPE_GOOD):
                this.apiService.deleteGood(this.state.collection.name, id).then((result) => {
                    console.log("deleteGood", result);
                    this.getDataFromDatabase(process.env.REACT_APP_LIST_TYPE_GOOD, this.state.collection);
                });
                break;
            default:
                break;
        }        
    }

    updateInputValue(evt) {        
        this.setState({
          inputValue: evt.target.value
        });
      }
    
    /** считывание записей из БД */
    getDataFromDatabase(listType, collection = null){
        console.log("getDataFromDatabase", listType, collection);

        switch (Number(listType)) {
            case Number(process.env.REACT_APP_LIST_TYPE_GROUP):                
                this.apiService.getAllGroups().then((result) =>{
                    this.setState({
                        title: "Категории",
                        result: result,
                        listType: listType,
                        collection: null,
                        inputValue: ''  
                    })
                })
                break;
            case Number(process.env.REACT_APP_LIST_TYPE_GOOD):
                this.apiService.getAllProductsByGroup(collection.name).then((result) =>{
                    this.setState({
                        title: collection.displayName, 
                        result: result,
                        listType: listType,
                        collection: collection,
                        inputValue: ''  
                    })
                })                
                break; 
            /*case 2:    
                this.apiService.addGroup(collection.name).then((result) =>{
                    console.log("addGroup", result);
                    this.getDataFromDatabase(0, null);
                })                                 
                break;*/
            default:
                console.log("default", listType, process.env.REACT_APP_LIST_TYPE_GROUP);
                break;
        }     
    }    

    render(){               
        return(
            <div className="App">
                <div className="Header">                    
                    <Header 
                        text = {this.state.title}
                        listType = {this.state.listType}
                        onClick = {(value)=>this.goBackClick(value)}
                        propOnClick = {(value)=>this.setProp(value)}
                    />
                </div>
                <div className='List'>
                    <List 
                        result={this.state.result}
                        listType = {this.state.listType}
                        onClick = {(parent)=>this.handleClick(parent)}
                        deleteOnClick = {(id)=>this.deleteOnClick(id)}
                        submitOnClick = {(value)=>this.submitOnClick(value)}
                        inputValue = {this.state.inputValue}
                        updateInputValue = {(evt)=>this.updateInputValue(evt)}                        
                    />
                </div>
            </div>

        );
    }
}

export default App;
import React from 'react';
import { AddGroup, AddGood } from '../additem/add_item.js';

class Group extends React.Component{
    /*
    shouldComponentUpdate(nextProps){
        if (this.props.value !== nextProps.value) return true;
  
        return false;
    } 
    */   
    render(){
        console.log("group render");

        return(
            <li key={this.props.id}>
                <button                     
                    className="Group" 
                    onClick={()=>{ this.props.onClick()}}
                >
                {this.props.name}                
                </button>        
                <button 
                    className="Group" 
                    onClick={()=>{this.props.deleteOnClick(this.props.id)}}
                >
                X Delete
                </button>                        
          </li>
        )
    }
}

class Good extends React.Component{
    /*
    shouldComponentUpdate(nextProps){
        if (this.props.value !== nextProps.value) return true;
  
        return false;
    } 
    */   
    render(){
        console.log("good render");

        let imgData = null;
        if (this.props.image){
            imgData = this.props.image.data;
            if (!imgData) imgData = null;
        }


        return(
            <li key={this.props.id}>
                <button 
                    className="Good" 
                >
                {this.props.name}                
                </button>
                <img height="100"
                    src={`data:image/jpeg;base64,${imgData}`}
                    alt="Изображение отсутствует">
                </img>
                <button 
                    className="Good" 
                    onClick={()=>{this.props.deleteOnClick(this.props.id)}}
                >
                X Delete
                </button>
            </li>
        )
    }
}

class List extends React.Component{
    renderElementGroup(obj){
        return(
            <Group
                id = {obj._id}
                name = {obj.displayName}                
                onClick = {()=>this.props.onClick(obj)}
                deleteOnClick = {(id)=>this.props.deleteOnClick(id)}
            />
        )
    }

    renderElementGood(obj){
        console.log(obj.name);
        return(
            <Good
                id = {obj._id}                 
                name = {obj.name}
                image = {obj.image}
                deleteOnClick = {(id)=>this.props.deleteOnClick(id)}
            />
        )
    }

    renderChangeGroup(obj){
        //console.log(obj.name);
        return(
            <AddGroup 
                inputValue = {this.props.inputValue}
                updateInputValue = {(evt)=>this.props.updateInputValue(evt)}
                onClick = {(value)=>this.props.submitOnClick(value)}

            />
        );
    }

    renderChangeGood(obj){
        //console.log(obj.name);
        return(
            <AddGood
                inputValue = {this.props.inputValue}
                updateInputValue = {(evt)=>this.props.updateInputValue(evt)}
                onClick = {(value)=>this.props.submitOnClick(value)}

            />
        );
    }    

    render(){      
        console.log("List render", this.props.listType);
        
        let elements;
        switch (Number(this.props.listType)) {
            case Number(process.env.REACT_APP_LIST_TYPE_GROUP):
            case Number(process.env.REACT_APP_LIST_TYPE_GOOD):
                elements = (<ol>
                            {this.props.result.map((result) => {
                                
                                if (this.props.listType==process.env.REACT_APP_LIST_TYPE_GROUP) {
                                    return this.renderElementGroup(result)

                                }else{
                                    return this.renderElementGood(result)
                                }
                            })}
                        </ol>);
                
                break;
            case Number(process.env.REACT_APP_LIST_TYPE_CHANGE_GROUP):            
                elements = this.renderChangeGroup(null);        
                break;
            case Number(process.env.REACT_APP_LIST_TYPE_CHANGE_GOOD):            
                elements = this.renderChangeGood(null);        
                break;
            default:
                break;
        }
        
        return(
            elements
        );
    }
}

export default List;
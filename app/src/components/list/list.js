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
            <li key={this.props.object._id}>
                <button                     
                    className="Group" 
                    onClick={()=>{ this.props.onClick()}}
                >
                {this.props.object.name}                
                </button>        
                <button
                    onClick={()=>{this.props.changeOnClick(this.props.object)}}>...</button>
                <button 
                    className="Group" 
                    onClick={()=>{this.props.deleteOnClick(this.props.object._id)}}
                >
                X
                </button>                        
          </li>
        )
    }
}

class Good extends React.Component{
    render(){
        console.log("good render");

        let imgData = null;
        if (this.props.object.image){
            imgData = this.props.object.image.data;
            if (!imgData) imgData = null;
        }
        //src={`data:image/jpeg;base64,${imgData}`}

        return(
            <li key={this.props.object.id}>
                <button 
                    className="Good" 
                >
                {this.props.object.name}                
                </button>
                <img height="100px"
                    src={imgData}
                    alt="Изображение отсутствует">
                </img>
                <button
                    onClick={()=>{this.props.changeOnClick(this.props.object)}}>...</button>
                <button 
                    className="Good" 
                    onClick={()=>{this.props.deleteOnClick(this.props.object.id)}}
                >
                X
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
                object = {obj}             
                onClick = {()=>this.props.onClick(obj)}
                changeOnClick = {(obj)=>this.props.changeOnClick(obj)}
                deleteOnClick = {(id)=>this.props.deleteOnClick(id)}
            />
        )
    }

    renderElementGood(obj){
        console.log(obj.name);
        return(
            <Good
                object = {obj}     
                changeOnClick = {(obj)=>this.props.changeOnClick(obj)}
                deleteOnClick = {(id)=>this.props.deleteOnClick(id)}
            />
        )
    }

    renderChangeGroup(){
        console.log("renderChangeGroup", this.props.inputObject);
        return(
            <AddGroup 
                inputValue = {this.props.inputValue}            
                inputObject = {this.props.inputObject}
                updateInputValue = {(evt)=>this.props.updateInputValue(evt)}
                onClick = {(value)=>this.props.submitOnClick(value)}

            />
        );
    }

    renderChangeGood(){
        console.log("renderChangeGood", this.props.inputObject);
        return(
            <AddGood
                inputValue = {this.props.inputValue}
                inputObject = {this.props.inputObject}
                updateInputValue = {(evt)=>this.props.updateInputValue(evt)}
                newImgObj = {this.props.newImgObj}
                chooseImageOnChange = {(evt)=>this.props.chooseImageOnChange(evt)}
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
                elements = this.renderChangeGroup();        
                break;
            case Number(process.env.REACT_APP_LIST_TYPE_CHANGE_GOOD):            
                elements = this.renderChangeGood();        
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
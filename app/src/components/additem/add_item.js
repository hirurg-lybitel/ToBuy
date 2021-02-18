import React from 'react';
//import UploadImage from './uploadImage';
//import DraggableUploader from "./draggableUploader";

import noImage from './image.png';
import './addItem.css';

/*
import { Image } from 'semantic-ui-react'

const ImageExampleImage = () => (
  <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' />
)
*/

export class AddGroup extends React.Component {
    render(){
        
        let inputObject;
        if (!this.props.inputObject){
            inputObject = {"name":this.props.inputValue};
        }else{
            inputObject = Object.assign({}, this.props.inputObject);            
            inputObject.name = this.props.inputValue;
        }

        //console.log("AddGroup", inputObject, this.props.inputObject);

        return (
            <div>
                <input value={this.props.inputValue} onChange={(evt) => this.props.updateInputValue(evt)}/>
                <button 
                    onClick={()=>this.props.onClick(inputObject)}>
                    OK
                </button>                  
            </div>
        );
    }
}

export class AddGood extends React.Component {

    render(){

               

        let inputObject;
        if (!this.props.inputObject){
            inputObject = {
                "name":this.props.inputValue,
                "image": {"data":"", "conentType":""}
            };
        }else{
            inputObject = Object.assign({}, this.props.inputObject);            
            inputObject.name = this.props.inputValue;            
        }

        if (this.props.newImgObj){
            //imgData = this.props.newImgData;

            inputObject.image.data = this.props.newImgObj.base64;
            inputObject.image.contentType = this.props.newImgObj.type;        
        }                    
        
        let imgData = noImage;
        if (inputObject.image){
            imgData = inputObject.image.data;
            if (!imgData){
                imgData = noImage;
            }else{
                //imgData = `data:image/jpeg;base64,${imgData}`;
            };
        }      

        console.log("AddGood", inputObject);   
        
        return (
            <div>
                <input
                    value={this.props.inputValue}
                    onChange={(evt) => this.props.updateInputValue(evt)}
                />
                <button 
                    onClick={()=>this.props.onClick(inputObject)}
                >
                    OK
                </button>   

                <img
                    className="img"
                    src={imgData}
                    alt='not found'></img>                
                <input type="file" onChange={(e)=>this.props.chooseImageOnChange(e)}/>              
            </div>
        );
    }

    //https://react.semantic-ui.com/images/wireframe/image.png
}
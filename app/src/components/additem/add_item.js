import React from 'react';
import DraggableUploader from "./draggableUploader";

export class AddGroup extends React.Component {
    render(){
        return (
            <div>
                <input value={this.props.inputValue} onChange={(evt) => this.props.updateInputValue(evt)}/>
                <button onClick={()=>this.props.onClick({"name":this.props.inputValue})} >OK</button>
            </div>
        );
    }
}

export class AddGood extends React.Component {
    state = {
        files: [
          'nice.pdf',
          'verycool.jpg',
          'amazing.png',
          'goodstuff.mp3',
          'thankyou.doc'
        ]
      }

      handleDrop = (files) => {
        let fileList = this.state.files
        for (var i = 0; i < files.length; i++) {
          if (!files[i].name) return
          fileList.push(files[i].name)
        }
        this.setState({files: fileList})
      }  

    render(){
        return (
            <div>
                <input value={this.props.inputValue} onChange={(evt) => this.props.updateInputValue(evt)}/>               
                <button onClick={()=>this.props.onClick({"name":this.props.inputValue})} >OK</button>
                
            </div>
        );
    }
}
import React from 'react';
import Text from 'react';
import './title.css';

class Title extends React.Component{
    render(){
        switch (this.props.listType) {
            case 0:                    
                return (  
                    <label>{this.props.text}</label>    
                )                                                            
            case 1:                    
                return (                            
                    <div>
                        <button
                            onClick={()=>this.props.onClick(this.props.listType)}>
                            {"<-"}
                        </button>
                        <label>{this.props.text}</label>
                    </div>                                                   
                )                                                
            default:
                break;
        }        
        return(
            <h3></h3>
        );
    }
}

export default Title;
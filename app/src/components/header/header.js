import React from 'react';
import './header.css';


import { Dropdown, Button } from 'semantic-ui-react';


const DropdownExampleDropdown = () => (
    <Dropdown        
        icon="ellipsis vertical">
      <Dropdown.Menu>
        <Dropdown.Item text='New' />
      </Dropdown.Menu>
    </Dropdown>
  )  

const Mybutton = () => (
    <Button  
        circular
        icon="arrow left">

    </Button>
)



class Header extends React.Component{
    render(){
        let buttonBack, buttonProp;

        buttonProp =(
            <button
                className="buttonProp"
                onClick={()=>this.props.propOnClick()}
                >
                ...
            </button>
        );        

        switch (Number(this.props.listType)) {
            case process.env.REACT_APP_LIST_TYPE_GROUP:               

                break;                                                    
            case Number(process.env.REACT_APP_LIST_TYPE_GOOD):
                buttonBack = (
                    <button
                            onClick={()=>this.props.onClick(this.props.listType)}>
                            {"<-"}
                    </button>
                );  
                break;
            case Number(process.env.REACT_APP_LIST_TYPE_CHANGE_GROUP):
            case Number(process.env.REACT_APP_LIST_TYPE_CHANGE_GOOD):
                buttonBack = (
                    <button
                    //process.env.REACT_APP_LIST_TYPE_GOOD
                            onClick={()=>this.props.onClick(this.props.listType)}>
                            {"<-"}
                    </button>
                );
                break;                                         
            default:
                break;
        }        
        
        return (                            
            <div>                
                {buttonBack}                
                <label>{this.props.text}</label>
                {buttonProp}                
            </div>
        )    
    }
}

export default Header;

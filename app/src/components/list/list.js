import React from 'react';

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
                    className="square" 
                    onClick={()=>{ this.props.onClick()}}
                >
                {this.props.name}                
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
            />
        )
    }

    render(){      
        console.log("List render", this.props.listType);

        const elements = this.props.result.map((result) => {
            switch (this.props.listType) {
                case 0:                    
                    return (                
                        this.renderElementGroup(result)                        
                    )                                                            
                case 1:                    
                    return (        
                        this.renderElementGood(result)
                    )                                                
                default:
                    break;
            }
            return (<li></li>);
        });        
        return(
            <ol>{elements}</ol>
        );
    }
}

export default List;
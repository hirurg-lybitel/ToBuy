import React from 'react';
import './addItem.css';

class UploadImage extends React.Component{
    render(){        
        return(
            <div>
                <img
                    class = "img"
                    src = {this.props.src}
                    alt='not found'></img>
                <button>Выбрать</button>
            </div>
        );
    }
}

export default UploadImage;
import React, { Component } from 'react';
class Phtotos extends Component {
    render() { 
        if (this.props.model.images.length>0){
            return ( 
                <div>
                    {
                        this.props.model.images.map((img) => {
                                return(
                                    <div>
                                        <img 
                                        src={img} 
                                        style={{width:"200px"}} 
                                        alt={"coule not load image"}/>
                                    </div>
                            )
                        })
                    }
                </div> 
            );
        }else{
            return(
                <div>no images in current room please slect another room</div>
            )
        }
    }
}
 
export default Phtotos;
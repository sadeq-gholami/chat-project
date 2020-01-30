import React, { Component } from 'react';
import '../Styles/View PhotoScreen/Photos.css';
class Phtotos extends Component {
    state= {}
    render() { 
        if (this.props.model.images.length>0){
            return ( 
                <div className ="Photos">
                    <div className="app-name">
                   {this.props.model.currentRoomName}
                    <img  width="100" className="right"
                            src ={ require('../images/crown12.png')}
                            alt ={"could not load image"}/>
                    <img  width="100" className="left"
                            src ={ require('../images/crown12.png')}
                            alt ={"could not load image"}/>
                            </div>
                    
                    {
                        this.props.model.images.map((img) => {
                                return(
                                    <div className= "image-len">
                                        <img className ="image"
                                        src={img} 
                                        alt={"could not load image"}/>
                                    </div>
                            )
                        })
                    }
                      
                </div> 
            );
        }else{
            return(
                <div className="no-photos">
                    <div className="app-name">
                   {this.props.model.currentRoomName}
                    <img  width="100" className="right"
                            src ={ require('../images/crown12.png')}
                            alt ={"could not load image"}/>
                    <img  width="100" className="left"
                            src ={ require('../images/crown12.png')}
                            alt ={"could not load image"}/>
                            </div>
                     <div className="no-images">No images in current room please select another room!</div>
                </div>
            )
        }
    }
}
 
export default Phtotos;
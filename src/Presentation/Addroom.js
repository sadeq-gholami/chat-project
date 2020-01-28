import React, { Component } from 'react';
import '../Styles/View Chatscreen Styles/Sidebar.css';

class Addroom extends React.Component{
    render(){ 
        return ( 
            <div className="addroom">
            <h5>Your rooms</h5>

       
            <div className="addroom" 
             onClick={this.props.displayPopup} >
            <div id="roomname" >Add rooms</div>
                              </div> 
        </div> 

     
         )
        
         
        }
}
 
export default Addroom; 
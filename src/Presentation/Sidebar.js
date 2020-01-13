import React, { Component } from 'react';
import '../Styles/View Chatscreen Styles/Sidebar.css';

class Sidebar extends React.Component{
    render(){
    const orderedJoinedRooms = [...this.props.joinedRooms].sort((a, b) => a.id > b.id);
       
        return ( 
            <div className="sidebar">
            <h3>Your rooms:</h3>
         <div>
        {orderedJoinedRooms.map(room=> 
        {  const active = this.props.currentroomID === room.id ? "active" : "";
        return(
                         <div className ={"roombackground " +active }
                         onClick={() => this.props.subscribeToRoom(room.id)} >
                              <div key={room.id}className="room" >
                                 <div id="roomname" >
                                     {room.name}
                                  </div>
                              </div>              
        </div>)})}
           
           
          
             
            </div>
            
     </div>
     
         );}
}
 
export default Sidebar; 
import React, { Component } from 'react';
import '../Styles/ViewChatscreenStyles/Sidebar.css';

class Sidebar extends React.Component{
    
    render(){
    const orderedJoinedRooms = [...this.props.joinedRooms].sort((a, b) => a.id > b.id);

return ( 
    <div className="content-sidebar">
        <h2>Your rooms</h2>       
        <div>
        {orderedJoinedRooms.map(room=> 
        {  const active = this.props.currentroomID === room.id ? "active" : "";
        return(
            <div key={room.id} className ={"roombackground " +active }
                    onClick={() => this.props.subscribeToRoom(room.id)} >
                <div key={room.id}className="room" >
                    <div id="roomname" >
                        {room.name}
                    </div>
                </div>              
            </div>)})}
             
        </div>
        <button className="addroom"  id="roomname" onClick={this.props.displayPopupGroup}  className="btnside"><span>Add rooms</span></button>
    </div>
         );
        }
         
}
 
export default Sidebar;
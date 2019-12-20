import React, { Component } from 'react';
//import '../Styles/Sidebar.css';







const Sidebar=({rooms})=> {
        return ( 

            <div className="sidebar">
            
            <h3>Your rooms:</h3>
            <ul>
        {rooms.map(room=> <li key={room.id} className = "room">{room.name}</li>)}
            </ul>
            </div>
         );
}
 
export default Sidebar; 
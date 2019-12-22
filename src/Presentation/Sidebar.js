import React, { Component } from 'react';
//import '../Styles/Sidebar.css';







const Sidebar=({rooms, subscribeToRoom})=> {
        return ( 

            <div className="sidebar">
            
            <h3>Your rooms:</h3>
            <ul>
        {rooms.map(room=>  <li key={room.id}>
                                <a href='#' onClick={() => subscribeToRoom(room.id)}>
                                    # {room.name}
                                </a>
                            </li>)}
            </ul>
            </div>
         );
}
 
export default Sidebar; 
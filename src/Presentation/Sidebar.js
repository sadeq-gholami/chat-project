import React, { Component } from 'react';
//import '../Styles/Sidebar.css';

const Sidebar=({rooms, subscribeToRoom})=> {
    const orderedRooms = [...rooms].sort((a, b) => a.id > b.id);
        return ( 

            <div className="sidebar">
            
            <h3>Your rooms:</h3>
            <ul>
        {orderedRooms.map(room=>  <li key={room.id}>
                                <a href='#' onClick={() => subscribeToRoom(room.id)}>
                                    # {room.name}
                                </a>
                            </li>)}
            </ul>
            </div>
         );
}
 
export default Sidebar; 
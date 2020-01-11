import React, { Component } from 'react';
import {Link} from "react-router-dom";
import '../Styles/View Chatscreen Styles/Sidebar.css';

const Sidebar=({joinedRooms, subscribeToRoom})=> {
    const orderedJoinedRooms = [...joinedRooms].sort((a, b) => a.id > b.id);
        return ( 

            <div className="sidebar">
            
            <h3>Your rooms:</h3>
            <ul>
        {orderedJoinedRooms.map(room=>  <li key={room.id}className="room">
                                <a href='#' onClick={() => subscribeToRoom(room.id)}>
                                     {room.name}
                                </a>
                            </li>)}
            </ul>
            <Link to={"/photos"}>
                <div  className="room">Photos</div>
            </Link>
            </div>
         );
}
 
export default Sidebar; 
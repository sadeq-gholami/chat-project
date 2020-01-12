import React, { Component } from 'react';
import {Link} from "react-router-dom";
import '../Styles/View Chatscreen Styles/Sidebar.css';
import * as PropTypes from "prop-types";

class Sidebar extends Component {
    render() {
        let {joinedRooms, subscribeToRoom} = this.props;
        const orderedJoinedRooms = [...joinedRooms].sort((a, b) => a.id > b.id);
        return (

            <div className="sidebar">

                <h3>Your rooms:</h3>

                {orderedJoinedRooms.map(room => <li key={room.id} className="room">
                    <a href='#' onClick={() => subscribeToRoom(room.id)}>
                        {room.name}
                    </a>
                </li>)}

                <Link to={"/photos"}>
                    <div className="room">Photos</div>
                </Link>
            </div>
        );
    }
}

Sidebar.propTypes = {
    joinedRooms: PropTypes.any,
    subscribeToRoom: PropTypes.any
}
 
export default Sidebar; 
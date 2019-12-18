import React, { Component } from 'react';
import '../Styles/Sidebar.css';
import '../Styles/Gstyle.css';






class Sidebar extends React.Component {
    render() { 
        return ( 

            <div className="sidebar">
            <button id = "Rbtn" onClick={this.handleSubmit} type="button" >Rooms</button> 
            <button id = "Cbtn" onClick={this.handleSubmit} type="button" >Contacts</button> 
            <h3>Your rooms:</h3>
            </div>
         );
    }
}
 
export default Sidebar; 
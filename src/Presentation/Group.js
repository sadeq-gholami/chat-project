import React, { Component } from 'react';
import '../Styles/View Chatscreen Styles/Group.css';
class Group extends Component {
    constructor(){
        super();
        this.state= {
            groupName: "",
            roomtojoin:""
        };
    }
    
    handlechange=(e)=>{
        this.setState({groupName:e.target.value})
    }
    handleSubmit=(e)=>{
        if(this.state.groupName===""){
            return;
        }
        e.preventDefault();
        this.props.closepopgroup()
        this.props.createRoom(this.state.groupName)
        this.setState({
            groupName:""
        })
    
    }
    handlechangejoin=(e)=>{
        this.setState({roomtojoin:e.target.value})
    }
    handleSubmitTojoin=(e)=>{
        e.preventDefault();
        this.props.closepopgroup()
        this.props.joinaroom(this.state.roomtojoin)
        this.setState({
            roomtojoin:""
        })
    }
    
    render() { 
        return ( 
        <div className="group">
        <div className="addgroup">
        <img  width="100" src={ require('../images/Createroom.png') } />
        <h5>Create a new Room with Choosen name</h5>
        <form className ="group-form" onSubmit={this.handleSubmit}>
            <input  
            onChange ={this.handlechange} 
                    value={this.state.groupName}
                    placeholder="Enter Name"
                    type="text"
                    maxLength={5}/>
            <button id = "groupbtn" onClick={this.handleSubmit} type="button" >Create new Room</button> 
            </form>
            </div>
            <div className="joingroup">
            <img  width="100" src={ require('../images/Joinaroom.png') } />
            <h5>Enter a Room with an Invite</h5>
            <form className ="group-form" onSubmit={this.handleSubmitTojoin}>
            <input  onChange ={this.handlechangejoin} 
                    value={this.state.roomtojoin}
                    placeholder="Enter Invite"
                    type="text"/>
         <button id = "groupbtn" onClick={this.handleSubmitTojoin} type="button" >Connect to a Room</button> 
            </form>
            </div>
            </div>
         );
    }
}
 
export default Group ;
import React, { Component } from 'react';
import '../Styles/View Chatscreen Styles/Group.css';
class Group extends Component {
    constructor(){
        super();
        this.state= {
            groupName: " "
        };
    }
    
    handlechange=(e)=>{
        this.setState({groupName:e.target.value})
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.createRoom(this.state.groupName)
        this.setState({
            groupName:" "
        })
    }
    
    render() { 
        return ( 
        <form className ="creategroupe" onSubmit={this.handleSubmit}>
            <input  onChange ={this.handlechange} 
                    value={this.state.groupName}
                    placeholder="Group Name"
                    type="text"/>
                     
            </form>
         );
    }
}
 
export default Group ;
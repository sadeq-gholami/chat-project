import React, { Component } from 'react';
import {Link} from "react-router-dom";
class Home extends Component {
    constructor(){
        super();
        this.state= {
            userName: " "
        };
    }
    
    handlechange=(e)=>{
        this.setState({userName:e.target.value});
       // console.log(this.state.userName);
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.setUserName(this.state.userName.toLowerCase());
    }
    render() { 
        return ( 
            
        <form className ="chatform" onSubmit={this.handleSubmit}>
            <input  onChange ={this.handlechange} 
                    value={this.state.userName}
                    placeholder="Enter username..."
                    type="text"/>
            <button id = "Sbtn" onClick={e=>this.handleSubmit(e)} type="button" >
                <Link to ={`/chatScreen/${this.state.userName.toLowerCase()}`}>login</Link>
                </button>
            </form>
            
         );
    }
}
 
export default Home;
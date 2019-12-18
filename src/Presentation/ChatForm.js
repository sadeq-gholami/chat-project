import React, { Component } from 'react';
//import '../Styles/ChatForm.css';
import '../Styles/Gstyle.css';





class ChatForm extends React.Component {
    constructor(){
        super();
        this.state= {
            message: " "
        };
    }
    
    handlechange=(e)=>{
        this.setState({message:e.target.value})
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.sendMsg(this.state.message)
    }
    render() { 
        return ( 
        <form className ="chatform" onSubmit={this.handleSubmit}>
            <input  onChange ={this.handlechange} 
                    value={this.state.message}
                    placeholder="Type"
                    type="text"/>
            <button id = "Sbtn" onClick={e=>this.handleSubmit()} type="button" >Send</button> 
            </form>
         );
    }
}
 
export default ChatForm;
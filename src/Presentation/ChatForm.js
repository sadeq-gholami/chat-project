import React, { Component } from 'react';
import '../Styles/ChatForm.css';
import '../Styles/Gstyle.css';





class ChatForm extends React.Component {
    constructor(){
        super();
        this.state= {
            message: " "
        };
    }
   
handlechange(e){
}
handleSubmit(e){
 
}
    render() { 
        return ( 
        <form className ="chatform" onSubmit={this.handleSubmit}>
            <input  onChange ={this.handlechange} 
                    placeholder="Type"
                    type="text"/>
            <button id = "Sbtn" onClick={this.handleSubmit} type="button" >Send</button> 
            </form>
         );
    }
}
 
export default ChatForm;
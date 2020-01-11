import React, { Component } from 'react';
import '../Styles/View Chatscreen Styles/ChatForm.css';






class ChatForm extends React.Component {
    constructor(){
        super();
        this.state= {
            message: ""
        };
    }
    
    handlechange=(e)=>{
        this.setState({message:e.target.value})
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.sendMsg(this.state.message)
        this.setState({
            message:""
        })
    }
    handleSubmitbtn=(e)=>{
        if (this.state.message!==""){
        this.props.sendMsg(this.state.message)
        }
        this.setState({
            message:""
        })
    }
    render() { 
        return ( 
        <form className ="chatform" onSubmit={this.handleSubmit}>
            <input  onChange ={this.handlechange} 
                    value={this.state.message}
                    placeholder="Enter Text"
                    type="text"/>
            <img className={"add-image-icon"}
                 src ={ require('../images/imageIcon.png')}
                 alt ={"could not load image"}
                 onClick={this.props.displayPopup}/>
            <button id = "Sbtn" onClick={e=>this.handleSubmitbtn()} type="button" >Send</button> 
            </form>
         );
    }
}
 
export default ChatForm;
import React, { Component } from 'react';
import '../Styles/ViewChatscreenStyles/ChatForm.css';


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
            <div className="takephoto">
                <img className={"add-image-icon"}
                    src ={ require('../images/attachment.png')}
                    alt ={"could not load image"}
                    onClick={this.props.displayPopup}/>
                 <span className="test">Attach file</span>
            </div> 
            <form className ="something">      
                <input  onChange ={this.handlechange} 
                    value={this.state.message}
                    placeholder="Enter Text"
                    type="text"/>
                <button onClick={e=>this.handleSubmitbtn()} className="send"> 
                    <img  width="28"
                            src ={ require('../images/send.png')}
                            alt ={"could not load"}/>
                </button>
            </form>
        </form> 
         );
    }
}
 
export default ChatForm;
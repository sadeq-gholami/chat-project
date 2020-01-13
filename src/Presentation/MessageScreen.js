  
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from './Message'
import '../Styles/View Chatscreen Styles/MessageScreen.css';

class MessageScreen extends React.Component{


    componentWillUpdate(){
        const position = ReactDOM.findDOMNode(this)
        this.ToBottom = position.scrollTop + position.clientHeight +100 >= position.scrollHeight
    }
    
    componentDidUpdate(){
            if(this.ToBottom){
                const position = ReactDOM.findDOMNode(this)
                position.scrollTop= position.scrollHeight
        }
    } 


render(){
    if(this.props.messages.length>0){
        return (  
            <div className= "messagescreen" >
                {this.props.messages.map((message,index)=>{
                    return (
                        <Message key={index} message ={message}/>
                        )
                })
            }
            </div>
        );
    }else{
        return(<div className= "messagescreen">
            Please select a room
        </div>);
    }        
 }
}
 
export default MessageScreen;

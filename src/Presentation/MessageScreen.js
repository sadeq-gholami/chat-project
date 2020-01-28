  
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from './Message'
import '../Styles/View Chatscreen Styles/MessageScreen.css';

class MessageScreen extends React.Component{


    componentWillUpdate(){
        const position = ReactDOM.findDOMNode(this)
        this.ToBottom = position.scrollTop + position.clientHeight +300 >= position.scrollHeight
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
                        <Message currentUser={this.props.currentuser}key={index} message ={message} displayPopup= {this.props.displayPopup}/>
                        )
                })
            }
            </div>
        );
    }else{
        return(<div className= "messagescreen">
            <div className ="noroom">Please select a room</div>
        </div>);
    }        
 }
}
 
export default MessageScreen;

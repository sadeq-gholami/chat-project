import React, { Component } from 'react';
import '../Styles/View Chatscreen Styles/Message.css';
const Message = ({message,currentUser})=> {
  console.log(message)
  if (message.text.includes(112)){
    return (
      <div className="event-message">
          {message.text.slice(0, -3)}
        </div>
     
    );
  }
  if (message.text.includes(10101)&&message.sender.name===currentUser.name){
    return(
      <div className="userMessage">
        <div className = "message-name">
          <img src ={message.sender.avatarURL} alt ={"no image"} style={{width:"30px", borderRadius:"50px"}}/>
           {message.sender.name}
           <img  width="8 " src={ require('../images/online.png') } />
           </div>
           <div className = "message-time">
           {message.createdAt.slice(0, -4)}
        </div>
        <a href={"https://chat-application-api.herokuapp.com/" + message.text.substr(5)} target="blank">
          <img src={"https://chat-application-api.herokuapp.com/" + message.text.substr(5)} 
                alt ={"could not load image"}
                className="sent-image"/>
        </a>
      </div>
    );
  }
  if(message.sender.name===currentUser.name){
    return (
      <div className="userMessage">
       
        <div className = "message-name">
        <img src ={message.sender.avatarURL} alt ={"no image"} style={{width:"30px", borderRadius:"50px"}}/>
           {message.sender.name}
           <img  width="8 " src={ require('../images/online.png') } />
           </div>
           <div className = "message-time">
           {message.createdAt.slice(0, -4)}
        </div>
        <div className = "message-text"> 
          {message.text}
        </div>
      </div>
    );
  }

  if (message.text.includes(10101)){
    return(
      <div className="Message">
         <div className = "message-name">
         <img src ={message.sender.avatarURL} alt ={"no image"} style={{width:"30px", borderRadius:"50px"}}/>
           {message.sender.name}
           <img  width="8 " src={ require('../images/online.png') } />
           </div>
           <div className = "message-time">
           {message.createdAt.slice(0, -4)}
        </div>
        <a href={"https://chat-application-api.herokuapp.com/" + message.text.substr(5)} target="blank">
          <img src={"https://chat-application-api.herokuapp.com/" + message.text.substr(5)} 
                alt ={"could not load image"}
                className="sent-image"/>
        </a>
      </div>
    );
  }

  if (message.sender.presence.state==="online"){
    return (
      <div className="Message">
       
        <div className = "message-name">
        <img src ={message.sender.avatarURL} alt ={"no image"} style={{width:"30px", borderRadius:"50px"}}/>
           {message.sender.name}
           <img  width="8 " src={ require('../images/online.png') } />
           </div>
           <div className = "message-time">
           {message.createdAt.slice(0, -4)}
        </div>
        <div className = "message-text"> 
          {message.text}
        </div>
      </div>
    );

  }
  

    
    return (
      <div className="Message">
       <div className = "message-name">
       <img src ={message.sender.avatarURL} alt ={"no image"} style={{width:"30px", borderRadius:"50px"}}/>
           {message.sender.name}
           </div>
           <div className = "message-time">
           {message.createdAt.slice(0, -4)}
        </div>
        <div className = "message-text"> 
          {message.text}
        </div>
      </div>
    );
}
 
export default Message;
import React, {Component} from 'react';
import '../Styles/View Chatscreen Styles/Message.css';

const Message = ({message,currentUser})=> {
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
        {message.sender.name}
          <img src ={message.sender.avatarURL} alt ={"no image"} className="user-image"/>
           </div>
           <div className = "message-time">
           {message.createdAt.slice(0, -4)}
        </div>
        <a href={ message.text.substr(5)} target="blank">
          <img src={message.text.substr(5)} 
                alt ={"could not load image"}
                className="sent-image"/>
        </a>
        <div className ="tooltip2">
<span className="tooltip2text" >

<img src ={message.sender.avatarURL} alt ={"no image"} className="user-image"/>
   {message.sender.name}
   </span>
   </div>
      </div>
    );
  }
  if(message.sender.name===currentUser.name){
    return (
      <div className="userMessage">
       
        <div className = "message-name">
            {message.sender.name}
        <img src ={message.sender.avatarURL} alt ={"no image"} className="user-image"/>
           </div>
           <div className = "message-time">
           {message.createdAt.slice(0, -4)}
        </div>
        <div className = "message-text"> 
          {message.text}
        </div>
        <div className ="tooltip2">
<span className="tooltip2text" >

<img src ={message.sender.avatarURL} alt ={"no image"} className="user-image"/>
   {message.sender.name}
   </span>
   </div>
      </div>
    );
  }

  if (message.text.includes(10101)){
    return(
      <div className="Message">
         <div className = "message-name">
         <img src ={message.sender.avatarURL} 
         alt ={"no image"} 
         className="user-image" />    
         
           {message.sender.name}
           </div>
           <div className = "message-time">
           {message.createdAt.slice(0, -4)}
        </div>
        <a href={"https://chat-application-api.herokuapp.com/" + message.text.substr(5)} target="blank">
          <img src={"https://chat-application-api.herokuapp.com/" + message.text.substr(5)} 
                alt ={"could not load image"}
                className="sent-image"/>
        </a>
        <div className ="tooltip2">
<span className="tooltip2text" >

<img src ={message.sender.avatarURL} alt ={"no image"} className="user-image"/>
   {message.sender.name}
   </span>
   </div>
      </div>
    );
  }
  return (
      <div className="Message">
       <div className = "message-name">
       <img src ={message.sender.avatarURL} alt ={"no image"} className="user-image"
         />
           {message.sender.name}
           </div>
           <div className = "message-time">
           {message.createdAt.slice(0, -4)}
        </div>
        <div className = "message-text"> 
          {message.text}
        </div>
        <div className ="tooltip2">
<span className="tooltip2text" >

<img src ={message.sender.avatarURL} alt ={"no image"} className="user-image"/>
   {message.sender.name}
   </span>
   </div>
      </div>
    );
}
 
export default Message;

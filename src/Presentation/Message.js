import React, { Component } from 'react';
import '../Styles/View Chatscreen Styles/Message.css';
const Message = ({message})=> {
    if (message.text.includes(10101)){
      return(
        <div>
          <div className = "message-sender"> 
            {message.sender.name + " " + message.createdAt + " " + message.sender.presence.state}
          </div>
          <a href={"https://chat-application-api.herokuapp.com/" + message.text.substr(5)} target="blank">
            <img src={"https://chat-application-api.herokuapp.com/" + message.text.substr(5)} 
                  alt ={"could not load image"}
                  className="sent-image"/>
          </a>
        </div>
      );
    }
    return (
      <div className="Message">
        <div className = "message-sender">
           {message.sender.name + " " + message.createdAt + " " + message.sender.presence.state}
        </div>
        <div className = "message-text"> 
          {message.text}
        </div>
      </div>
    );
}
 
export default Message;
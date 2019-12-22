import React, { Component } from 'react';

const Message =({message})=> {
        return (
            <div className="Message">
              <div className = "message-sender"> {message.sender.name + " " + message.createdAt + " " + message.sender.presence.state}</div>
            <div className = "message-text"> {message.text}</div>
            </div>
          );
}
 
export default Message;
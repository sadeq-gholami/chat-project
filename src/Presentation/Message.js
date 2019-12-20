import React, { Component } from 'react';

const Message =({message})=> {
        return (
            <div className="Message">
              <div className = "message-sender"> {message.sender.name}</div>
            <div className = "message-text"> {message.text}</div>
            </div>
          );
}
 
export default Message;
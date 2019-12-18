  
import React, { Component } from 'react';
import '../Styles/MessageScreen.css';
import '../Styles/Gstyle.css';
class MessageScreen extends React.Component {
    render() { 
        return (  
            <div className= "messagecreen" >
                {hardCode.map((message,index)=>{
                    return (
                        <div key={index} className= "Message">
                        <div className = "message-text"> {message.text}</div>
                        <div className = "message-sender"> {message.senderId}</div>
                        </div>
                    )
                })}
                </div>
        );
    }
}
 
export default MessageScreen;
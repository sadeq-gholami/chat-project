import React, { Component } from 'react';
import '../Styles/MessageScreen.css';
import '../Styles/Gstyle.css';



const hardCode= [
    {
        senderId :'Ulla',
        text:'hej hur går det?' 
    },
    {
        senderId :'Birgitta',
        text:'Inte bra :(' 
    },

    {
        senderId :'Eva',
        text:'Tufft' 
    }

]




class MessageScreen extends React.Component {
    render() { 
        return (  
            <div className= "messagescreen" >
                {hardCode.map((message,index)=>{
                    return (
                        <div key={index} className= "Message">
                        <div className = "message-sender"> {message.senderId}</div>
                        <div className = "message-text"> {message.text}</div>
                        
                        </div>
                    )
                })}
                </div>
        );
    }
}
 
export default MessageScreen;
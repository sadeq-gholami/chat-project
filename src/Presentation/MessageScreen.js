import React, { Component } from 'react';


const hardCode= [
    {
        senderId :'Ulla',
        text:'hej hur går det?' 
    },
    {
        senderId :'Bergitta',
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
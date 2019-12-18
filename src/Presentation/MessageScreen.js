  
import React, { Component } from 'react';
import Message from './Message'
//import '../Styles/MessageScreen.css';
import '../Styles/Gstyle.css';
 const MessageScreen = ({messages})=> { 
    if (messages.length===0){    
        return <div>no messages</div>
        
        }
        else{
            return (  
                <div className= "messagescreen" >
                    {messages.map((message,index)=>{
                        return (
                            <Message key={index} message ={message}/>
                            )
                    })
                }
                </div>
            );
        }
}
 
export default MessageScreen;
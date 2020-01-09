  
import React, { Component } from 'react';
import Message from './Message'
import '../Styles/View Chatscreen Styles/MessageScreen.css';

 const MessageScreen =({messages})=>{
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
  
 export default MessageScreen;
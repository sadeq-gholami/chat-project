import React, {Component} from 'react';
import '../Styles/ViewChatscreenStyles/Message.css';

const Message = ({message,currentUser})=> {
  if (message.text.includes(112)){
    return (
      <div className="event-message">
          {message.text.slice(0, -3)}
      </div>
    );
  }else if (message.text.includes(10101)&&message.sender.name===currentUser.name){
    return(
        <RecievedPicture message={message}/>
    );
  }else if(message.sender.name===currentUser.name){
    return (
      <RecievedMessage message={message}/>
    );
  }else if (message.text.includes(10101)){
    return(
      <SentPicture message={message}/>
    );
  }else{
    return (
      <SentMessage message={message}/>
      );
  }
}
 
export default Message;

const RecievedPicture =({message})=>{
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
      </div>
  )
};

const RecievedMessage =({message})=>{
  return(
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
    </div>
  )
};

const SentPicture =({message})=>{
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
      <a href={message.text.substr(5)} target="blank">
        <img src={message.text.substr(5)} 
              alt ={"could not load image"}
              className="sent-image"/>
      </a>
    </div>
  )
};

const SentMessage =({message})=>{
  return(
    <div className="Message">
    <div className = "message-name">
      <img src ={message.sender.avatarURL} alt ={"no image"} className="user-image"/>
        {message.sender.name}
    </div>
    <div className = "message-time">
        {message.createdAt.slice(0, -4)}
    </div>
    <div className = "message-text"> 
        {message.text}
    </div>
</div>
  )
};

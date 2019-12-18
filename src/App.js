import ChatModel from './Model/ChatModel';
import React, { Component } from 'react';
import Sidebar from './Presentation/Sidebar';
import ChatForm from './Presentation/ChatForm';
import MessageScreenComp from './Components/chatScreen';
import ChatScreen from './Components/chatScreen';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {  
      model : new ChatModel()
    }
  }
  render(){
  return(    
    <div>
      <ChatScreen model = {this.state.model}/>
      </div>
  );
  }
}
export default App;

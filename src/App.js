import ChatModel from './Model/ChatModel';
import React, { Component } from 'react';
import MessageScreen from "./Presentation/MessageScreen"
import Sidebar from './Presentation/Sidebar';
import ChatForm from './Presentation/ChatForm';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {  
      model : new ChatModel()
    }
    this.state.model.addObserver(this)
  }
  update(payLoad){
    this.state.model.subscribeToRoom("c1afc728-2acf-40d7-b0d5-f51ce79e2c04",this.state.model.currentUser).then(
      message => console.log(message)
    )
  }
  render(){
  return(    
    <div className= "app">
      <MessageScreen/>
      <Sidebar/>
      <ChatForm/>
      </div>
  );
  }
}
export default App;

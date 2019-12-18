import ChatModel from './Model/ChatModel';
import React, { Component } from 'react';
//import Chatkit from '@pusher/chatkit';
class App extends Component {
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
  render() { 
    this.state.model.init().then(
      currentUser=> {this.state.model.setCurrentUser(currentUser)})

    
    

    return ( 
      <div></div>
     );
  }
}
 
export default App;

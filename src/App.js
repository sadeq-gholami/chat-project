import ChatModel from './Model/ChatModel';
import React, { Component } from 'react';
//import Chatkit from '@pusher/chatkit';
class App extends Component {
  constructor(props){
  super(props);
  this.state = {  
    model : new ChatModel()
  }
}
  render() { 
    this.state.model.init().then(
      currentUser=> {this.state.model.subscribeToRoom("c1afc728-2acf-40d7-b0d5-f51ce79e2c04", currentUser)}
    )
    return ( 
      <div></div>
     );
  }
}
 
export default App;

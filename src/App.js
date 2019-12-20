import ChatModel from './Model/ChatModel';
import React, { Component } from 'react';
import Sidebar from './Presentation/Sidebar';
import ChatForm from './Presentation/ChatForm';
import MessageScreenComp from './Components/chatScreen';
import ChatScreen from './Components/chatScreen';
import Home from './Components/Home';
import{BrowserRouter as Router, Route} from "react-router-dom";
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {  
      userName: "",
      model : new ChatModel()
      
    }
  }
  setUserName= username=>{
    this.state.userName = username;
   // this.setState({userName:username});
    console.log(this.state.userName);
   
  }
  render(){

  return(
     <Router>
        <div className="root1">
          <Route path ="/" exact render={(props)=>{
                return <Home {...props}  setUserName={userName=> this.setUserName(userName)}/>
               }}/>
           <Route path="/chatScreen" render= {(props)=>{
                 return <ChatScreen userName= {this.state.userName}{...props}model = {this.state.model}/>
                }}/>
          </div>
      </Router>   
  );
  }
}
export default App;

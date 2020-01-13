import ChatModel from './Model/ChatModel';
import React, { Component } from 'react';
import ChatScreen from './Components/chatScreen';
import Home from './Components/Home';
import{BrowserRouter as Router, Route} from "react-router-dom";
import Phtotos from './Components/photos';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {  
      userName: "",
      model : new ChatModel()
    }
  }
  setUserName= username=>{
    console.log(username);
    this.state.model.logIn(username);
  }
  componentDidMount(){
   
  }
  render(){

  return(
     <Router>
        <div className="root1">
          <Route path ="/" exact render={(props)=>{
                return <Home {...props}  setUserName={userName=> this.setUserName(userName)} model ={this.state.model}/>
               }}/>
           <Route path="/chatScreen/:userName" render= {(props)=>{
                 return <ChatScreen  {...props}model = {this.state.model}/>
                }}/>
            <Route path="/photos" render= {(props)=>{
                 return <Phtotos  {...props}model = {this.state.model}/>
                }}/>
          </div>
      </Router>   
  );
  }
}
export default App;

import ChatModel from './Model/ChatModel';
import React, { Component } from 'react';
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
    fetch('http://localhost:3001/users', {
     method: 'POST',
     headers: {
    'Content-Type': 'application/json',
     },
     body: JSON.stringify({ username }),
    })
    .then(response => {
      this.setState({userName:username})
      console.log(this.state.userName)
      console.log(response)
    })
  .catch(error => console.error('error', error))
  }
  componentDidMount(){
   
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

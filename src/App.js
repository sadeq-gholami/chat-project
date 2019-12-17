import React from 'react';
import MessageScreen from "./Presentation/MessageScreen"
import Sidebar from './Presentation/Sidebar';
import ChatForm from './Presentation/ChatForm';
class App extends React.Component{
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

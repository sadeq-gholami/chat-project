import React, { Component } from 'react';
import MessageScreen from '../Presentation/MessageScreen';
import Sidebar from '../Presentation/Sidebar';
import ChatForm from '../Presentation/ChatForm';
import Header from '../Presentation/Header';

class ChatScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            currentUser:null,
            messages:[],
            currentRoomId:null,
            availableRooms:[],
            takenRooms:[],
        }
        let username= 'Sadeq';
        fetch('http://localhost:3001/users', {
         method: 'POST',
         headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then(response => {
       console.log(response)
      })
      .catch(error => console.error('error', error))
    }
    componentDidMount() {
        this.props.model.init().then(
            currentUser =>{ 
                this.setState({currentUser:currentUser,
                takenRooms:currentUser.rooms})
                currentUser.subscribeToRoom({
                roomId: "8270ba83-7cf5-4647-9e0b-2302741b45c1",
                hooks: {
                    onMessage: message => {
                        this.setState({

                            messages: [...this.state.messages, message]
    
                        })
                    }
                }
            }).then(currentRoom => {
                this.setState({currentRoomId: currentRoom.id})
                 
            })
            .catch(err => console.log('error on subscribing: ', err))   
        })
    }
    sendMsg=(text)=>{
        console.log(text);
        this.state.currentUser.sendMessage({
        text,
        roomId: this.state.currentRoomId
    });

    }
    joinRoom(){
        this.state.currentUser.getJoinableRooms()
        .then(availableRooms => {
           this.setState({
               availableRooms:availableRooms,
               takenRooms: this.state.currentUser.rooms
    })
            })
    }

    render() { 
        return ( 
            <div className="app">
                <MessageScreen messages = {this.state.messages}/>
                <Sidebar rooms={this.state.takenRooms}/>
                <ChatForm sendMsg = {msg => this.sendMsg (msg)}/>
                <Header />
            </div>
         );
    }
}
 
export default ChatScreen;
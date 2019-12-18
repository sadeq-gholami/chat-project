import React, { Component } from 'react';
import MessageScreen from '../Presentation/MessageScreen';
import Sidebar from '../Presentation/Sidebar';
import ChatForm from '../Presentation/ChatForm';
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
    }
    componentDidMount() {
        this.props.model.init().then(
            currentUser =>{ 
                this.setState({currentUser:currentUser,
                takenRooms:currentUser.rooms})
                currentUser.subscribeToRoom({
                roomId: "c1afc728-2acf-40d7-b0d5-f51ce79e2c04",
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
            </div>
         );
    }
}
 
export default ChatScreen;
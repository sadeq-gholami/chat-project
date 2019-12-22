import React, { Component } from 'react';
import MessageScreen from '../Presentation/MessageScreen';
import Sidebar from '../Presentation/Sidebar';
import ChatForm from '../Presentation/ChatForm';
import Header from '../Presentation/Header';
import Group from '../Presentation/Group';

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
    update(){
        
    }
    componentDidMount() {
        console.log(this.props.model.userName)
        this.props.model.connectToAPI('Sadeq').then(
            currentUser =>{ 
                this.setState({currentUser:currentUser});
                console.log(this.state.currentUser);
                return currentUser.getJoinableRooms()
             
            .then(joinableRooms => {
                this.setState({
                    availableRooms:joinableRooms,
                    takenRooms: this.state.currentUser.rooms
                })
                })
            })
            .catch(err => console.log('error on subscribing: ', err))   
    }
    sendMsg=(text)=>{
        this.props.model.sendMessage(text, this.state.currentUser);
    };
    createRoom=(name)=> {
        this.currentUser.createRoom({
            name
        })
        .then(room => this.subscribeToRoom(room.id))
        .catch(err => console.log(err))
    }
    subscribeToRoom(roomId) {
        this.setState({
            messages: []
        });
        this.currentUser.subscribeToRoom({
            roomId: roomId,
            hooks: {
                onNewMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                }
            }
        })
        .then(currentRoom => {
            this.setState({currentRoomId: currentRoom.id})
            return this.currentUser.getJoinableRooms()
            .then(joinableRooms => {
                this.setState({
                    availableRooms:joinableRooms,
                    takenRooms: this.currentUser.rooms
                })
            })
        })
        .catch(err => console.log('error on subscribing: ', err))
    }

    render() { 
        return ( 
            <div className="app">
                <MessageScreen messages = {this.state.messages}/>
                <Sidebar rooms={this.state.takenRooms} subscribeToRoom={roomId=>this.subscribeToRoom(roomId)}/>
                <ChatForm sendMsg = {msg => this.sendMsg (msg)}/>
                <Group createRomm={name =>this.createRoom(name)}/>
                <Header />
            </div>
         );
    }
}
 
export default ChatScreen;
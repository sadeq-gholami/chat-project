import React, { Component } from 'react';
import MessageScreen from '../Presentation/MessageScreen';
import Sidebar from '../Presentation/Sidebar';
import ChatForm from '../Presentation/ChatForm';
import Header from '../Presentation/Header';
import Group from '../Presentation/Group';
import Roomsettings from '../Presentation/Roomsettings'; 

class ChatScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            currentUser:null,
            messages:[],
            currentRoomId:null,
            joinedRooms:[],
        }
    }
    update(){
        
    }
    componentDidMount() {
        console.log(this.props.match.params.userName)
        this.props.model.logIn(this.props.match.params.userName).then(res=>{
            this.start();
        });
        
    }
    start=()=>{
        this.props.model.connectToAPI(this.props.match.params.userName).then(
            currentUser =>{ 
                this.setState({
                    currentUser:currentUser,
                    joinedRooms:currentUser.rooms
                })
            })
            .catch(err => console.log('error on subscribing: ', err));   
    }
    
    sendMsg=(text)=>{
        this.props.model.sendMessage(text, this.state.currentUser);
    };
    createRoom=(name)=> {
        this.state.currentUser.createRoom({
            name
        })
        .then(room => this.subscribeToRoom(room.id))
        .catch(err => console.log(err))
    }
    
    leaveroomID(){
        this.state.currentUser.leaveRoom({ roomId: this.state.currentRoomId })
        .then(room => {
            this.setState({
                joinedRooms:this.state.currentUser.rooms,
                messages:[]
            });
            console.log(`Left room with ID: ${room.id}`);
        })
        .catch(err => {
            console.log(`Error leaving room ${this.state.currentRoomId}: ${err}`)
        })
    }

    deleteRoom(){
        this.state.currentUser.deleteRoom({ roomId: this.state.currentRoomId })
            .then(() => {
                console.log(`Deleted room with ID: ${this.state.currentRoomId}`)
            })
            .catch(err => {
                console.log(`Error deleted room ${this.state.currentRoomId}: ${err}`)
            })
    }

    addusertoroom=(userName)=>{
        this.state.currentUser.addUserToRoom({
            userId: userName,
            roomId: this.state.currentRoomId
          })
            .then(() => {
              console.log(`Added User to room ${this.state.currentRoomId}`)
            })
            .catch(err => {
              console.log(`Error adding User to room 123: ${this.state.currentRoomId} ${err}`)
            })
    }
    removeUserFromRoom=(userName)=>{
        this.state.currentUser.removeUserFromRoom({
            userId: userName,
            roomId: this.state.currentRoomId
          })
            .then(() => {
              console.log(`Removed User to room ${this.state.currentRoomId}`)
            })
            .catch(err => {
              console.log(`Error Removing User from room: ${this.state.currentRoomId} ${err}`)
            })
    }

    subscribeToRoom(roomId) {
        this.state.messages=[];
        this.props.model.setCurrentRoomId(roomId);
        this.state.currentUser.subscribeToRoom({
            roomId: roomId,
            hooks: {
                onMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                }
            }
        })
        .then(currentRoom => {
            this.setState({currentRoomId: currentRoom.id})
            return this.state.currentUser.getJoinableRooms()
            .then(joinableRooms => {
                this.setState({
                    availableRooms:joinableRooms,
                    takenRooms: this.state.currentUser.rooms
                })
            })
        })
        .catch(err => console.log('error on subscribing: ', err))
    }

    render() { 
        return ( 
            <div className="app">
                <MessageScreen messages = {this.state.messages}/>
                <Sidebar  joinedRooms={this.state.joinedRooms} subscribeToRoom={roomId=>this.subscribeToRoom(roomId)}/>
                <ChatForm sendMsg = {msg => this.sendMsg (msg)}/>
                <Group createRoom={name =>this.createRoom(name)}/>
                <Header />
                <Roomsettings leaveRoom={roomId=>this.leaveroomID()} 
                                deleteRoom = {roomId=> this.deleteRoom()} 
                                addusertoroom={user=>this.addusertoroom(user)}
                                removeUserFromRoom={user=>this.removeUserFromRoom(user)}/>
            </div>
         );
    }
}
 
export default ChatScreen;
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
        console.log(this.props.match.params.userName)
        this.props.model.logIn(this.props.match.params.userName).then(res=>{
            this.start();
        });
        
    }
    start=()=>{
        this.props.model.connectToAPI(this.props.match.params.userName).then(
            currentUser =>{ 
                this.setState({currentUser:currentUser});
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
        this.state.currentUser.createRoom({
            name
        })
        .then(room => this.subscribeToRoom(room.id))
        .catch(err => console.log(err))
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
                    console.log(message)
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
                <Sidebar rooms={[...this.state.availableRooms,...this.state.takenRooms]} subscribeToRoom={roomId=>this.subscribeToRoom(roomId)}/>
                <ChatForm sendMsg = {msg => this.sendMsg (msg)}/>
                <Group createRoom={name =>this.createRoom(name)}/>
                <Header />
            </div>
         );
    }
}
 
export default ChatScreen;
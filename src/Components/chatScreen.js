import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MessageScreen from '../Presentation/MessageScreen';
import Sidebar from '../Presentation/Sidebar';
import ChatForm from '../Presentation/ChatForm';
import Header from '../Presentation/Header';
import Group from '../Presentation/Group';
import RoomSettings from '../Presentation/Roomsettings';
import uuid from 'react-uuid'


class ChatScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            currentUser:null,
            messages:[],
            currentRoomId:null,
            selectedImage:null,
            imageId: null,
            joinedRooms:[],
            users:[]
        }
    }
    update(){
        
    }
    componentDidMount() {
        this.props.model.login()
        .then(currentUser =>{ 
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
        .catch(err => console.log(err));
    };
    
    leaveroomID(){
        this.sendMsg(`${this.state.currentUser.name} left the group112`);
        this.state.currentUser.leaveRoom({ roomId: this.state.currentRoomId })
        .then(room => {
            this.setState({
                joinedRooms:this.state.currentUser.rooms,
                messages:[]
            })
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
          }).then(()=>{
            this.sendMsg(`${this.state.currentUser.name} added ${userName}112`)
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
            }).then(()=>{
                this.sendMsg(`${this.state.currentUser} has removed ${userName} Joined room112`)
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
                    });
                    this.props.model.setImages(this.state.messages);
                }
            }
        })
        .then(currentRoom => {
            this.setState({
                currentRoomId: currentRoom.id,
                users:currentRoom.users
            })
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
    
    fileSelectedHandlar = event=>{
        this.setState({
            selectedImage: event.target.files[0]
        });
        
    }
    imageUploadHandler= event=>{
        let data = new FormData();
        data.append('name', this.state.selectedImage.name);
        data.append('imgUrl', this.state.selectedImage);
        fetch('https://chat-application-api.herokuapp.com/pictures', {
        method: 'POST',
        body: data
       })
       .then(response => {
          return response.json();
       })
       .then(data=>{
           this.sendMsg("10101" + data.createdPicture.imgUrl);
           this.closePopup();
       })
     .catch(error => console.error('error', error));
    }

    displayPopup=event=>{
        const node = ReactDOM.findDOMNode(this);
        node.querySelector('.bg-modal').style.display= 'flex';
    }

    closePopup = event =>{
        const node = ReactDOM.findDOMNode(this);
        node.querySelector('.bg-modal').style.display= 'none';
    }

    collapseRoomsettings = (e)=>{
        const node = ReactDOM.findDOMNode(this);
        e.target.classList.toggle("active");
        let contentRoomSettings = node.querySelector(".content-room-settings");
        let contentSidebar = node.querySelector(".content-sidebar");
        if (!contentSidebar.style.maxWidth && contentRoomSettings.style.maxWidth){
            contentRoomSettings.style.maxWidth = null;
            node.querySelector('.messagescreen').style.gridColumn="1/-1";
        }else if (contentSidebar.style.maxWidth && contentRoomSettings.style.maxWidth){
            contentRoomSettings.style.maxWidth = null;
            node.querySelector('.messagescreen').style.gridColumn="2/-1";
        }else if (!contentSidebar.style.maxWidth && !contentRoomSettings.style.maxWidth){
            contentRoomSettings.style.maxWidth = "250px";
            node.querySelector('.messagescreen').style.gridColumn="1/-2";
        }else{
            contentRoomSettings.style.maxWidth = "250px";
            node.querySelector('.messagescreen').style.gridColumn="2/-2"
        }
    }

    collapseSidebar = (e)=>{
        const node = ReactDOM.findDOMNode(this);
        e.target.classList.toggle("active");
        let contentRoomSettings = node.querySelector(".content-room-settings");
        let contentSidebar = node.querySelector(".content-sidebar");
        if (contentSidebar.style.maxWidth && !contentRoomSettings.style.maxWidth){
            contentSidebar.style.maxWidth = null;
            node.querySelector('.messagescreen').style.gridColumn="1/-1";
        }else if (contentSidebar.style.maxWidth && contentRoomSettings.style.maxWidth){
            contentSidebar.style.maxWidth = null;
            node.querySelector('.messagescreen').style.gridColumn="1/-2";
        }else if (!contentSidebar.style.maxWidth && !contentRoomSettings.style.maxWidth){
            contentSidebar.style.maxWidth = "300px";
            node.querySelector('.messagescreen').style.gridColumn="2/-1";
        }else {
            contentSidebar.style.maxWidth = "300px";
            node.querySelector('.messagescreen').style.gridColumn="2/-2"
        }
    }

    render() { 
        return ( 
            <div className="app">
                <MessageScreen currentuser={this.state.currentUser} messages = {this.state.messages} imageId={this.state.imageId}/>
                <Sidebar currentroomID={this.state.currentRoomId}joinedRooms={this.state.joinedRooms} subscribeToRoom={roomId=>this.subscribeToRoom(roomId)}/>
                <ChatForm sendMsg = {msg => this.sendMsg (msg)} displayPopup={this.displayPopup}/>
              
                <Header curentRoom={this.state.currentRoom} displayPopup={this.collapseRoomsettings} collapseSidebar={this.collapseSidebar}/>


                <div className={"bg-modal"}>
                    <div className={"modal-pop-up"}>
                        <div className="close" onClick={this.closePopup}>+</div>
                        <img className={"add-image-icon-form"}
                            src ={ require('../images/bluecamera.png')} 
                            alt ={"could not load image"}/>
                        <div>
                    <label for="files" className={"btn"}>Select JPG/png Image to send</label>
                    <input   type="file"
                             style={{visibility:"hidden"}}
                             id="files"
                             onChange={this.fileSelectedHandlar}/>
                    </div>
                        <button  className={"btn"} 
                                onClick={this.imageUploadHandler}>
                                    upload
                                    </button>   
                    </div>
                </div>
                <RoomSettings   leaveRoom={roomId=>this.leaveroomID()}
                                deleteRoom = {roomId=> this.deleteRoom()} 
                                addusertoroom={user=>this.addusertoroom(user)}
                                removeUserFromRoom={user=>this.removeUserFromRoom(user)}
                                users={this.state.users}/>
            </div>
                
         );
    }
}
 
export default ChatScreen;
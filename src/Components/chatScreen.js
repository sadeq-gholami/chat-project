import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MessageScreen from '../Presentation/MessageScreen';
import Sidebar from '../Presentation/Sidebar';
import ChatForm from '../Presentation/ChatForm';
import Header from '../Presentation/Header';
import UsersSideBar from '../Presentation/UsersSideBar';
import RoomSettings from "../Presentation/Roomsettings";


import Group from '../Presentation/Group';
import Roomsettings from '../Presentation/Roomsettings'; 
import {CopyToClipboard} from 'react-copy-to-clipboard';
import SendPicPopUp from '../Presentation/SendPicPopUp';
class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state={
            currentUser:null,
            messages:[],
            currentRoomId:"",
            selectedImage:null,
            currentroomName: "",
            joinedRooms:[],
            users:[],
            currentRoom: null 
        }
    }


    componentDidMount() {
        this.props.model.login()
        .then(currentUser => {
            this.setState({
                currentUser: currentUser,
                joinedRooms: currentUser.rooms
            })
            this.subscribeToRoom(sessionStorage.getItem("currentRoomID"))
        })
        .catch(err => console.log('error on subscribing: ', err));
        console.log(this.state.currentroomName)
    }

    sendMsg = (text) => {
        this.props.model.sendMessage(text, this.state.currentUser);
    };

    createRoom = (name) => {
        this.state.currentUser.createRoom({
            name
        })
            .then(room => this.subscribeToRoom(room.id))
            .catch(err => console.log(err));
            
    };

    leaveroomID() {
        this.sendMsg(`${this.state.currentUser.name} left the group`);
        this.state.currentUser.leaveRoom({roomId: this.state.currentRoomId})
            .then(room => {
                this.setState({
                    joinedRooms: this.state.currentUser.rooms,
                    messages: [],
                    currentroomName:""
                })
                sessionStorage.setItem("currentRoomID", "");
                console.log(`Left room with ID: ${room.id}`);
            })
            .catch(err => {
                console.log(`Error leaving room ${this.state.currentRoomId}: ${err}`)
            })
    }

    joinaroom(roomid){
     this.state.currentUser.joinRoom({ roomId:roomid})
    .then(room => {
        this.subscribeToRoom(roomid);
        console.log(`Joined room with ID: ${room.id}`)
      })
      .catch(err => {
        console.log(`Error joining room ${roomid}: ${err}`)
      })
    }

    addUserToRoom = (userId) => {
        this.state.currentUser.addUserToRoom({
            userId: userId,
            roomId: this.state.currentRoomId
        }).then(() => {
            this.sendMsg(`${this.state.currentUser.name} added ${userId} to room.112`)
            this.subscribeToRoom(this.state.currentRoomId);
        }).then(() => {
            console.log(`Added User to room ${this.state.currentRoomId}`)
        }).catch(err => {
            console.log(`Error adding User to room 123: ${this.state.currentRoomId} ${err}`)
        })
    }

    removeUserFromRoom = (userId) => {
        this.state.currentUser.removeUserFromRoom({
            userId: userId,
            roomId: this.state.currentRoomId
          })
            .then(() => {
              console.log(`Removed User to room ${this.state.currentRoomId}`)
            }).then(()=>{
                this.sendMsg(`${this.state.currentUser.name} has removed ${userId}112`)
              })
            .catch(err => {
              console.log(`Error Removing User from room: ${this.state.currentRoomId} ${err}`)
            })
    }

   

    subscribeToRoom(roomId) {
        this.state.messages = [];
        this.props.model.setCurrentRoomId(roomId);
        sessionStorage.setItem("currentRoomID", roomId);
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
        }).then(currentRoom => {
            this.setState({
                currentRoomId: currentRoom.id,
                currentRoom: currentRoom,
                users:currentRoom.users,
                currentroomName :currentRoom.name

            })
            sessionStorage.setItem("currentroomName", this.state.currentroomName);
            return this.state.currentUser.getJoinableRooms()
                .then(joinableRooms => {
                    this.setState({
                        availableRooms: joinableRooms,
                        takenRooms: this.state.currentUser.rooms
                    })
                })
        }).catch(err => console.log('error on subscribing: ', err))
    }

    fileSelectedHandlar = event => {
        this.setState({
            selectedImage: event.target.files[0]
        });
        
    }
   
    imageUploadHandlar= event=>{        
        let data = new FormData();
        data.append('name', this.state.selectedImage.name);
        data.append('imgUrl', this.state.selectedImage);
        fetch('https://chat-application-api.herokuapp.com/pictures', {
            method: 'POST',
            body: data
        }).then(response => {
            return response.json();
        }).then(data => {
            this.sendMsg("10101" + data.url);
            this.closePopup();
        }).catch(error => console.error('error', error));
    }

    displayPopup = event => {
        const node = ReactDOM.findDOMNode(this);
        node.querySelector('.bg-modal').style.display = 'flex';
    }

    closePopup = event => {
        const node = ReactDOM.findDOMNode(this);
        node.querySelector('.bg-modal').style.display = 'none';
    }


    displayPopupGroup=event=>{
        const node = ReactDOM.findDOMNode(this);
        node.querySelector('.groupbody-model').style.display= 'flex';
    }

    closePopupGroup= event =>{
        const node = ReactDOM.findDOMNode(this);
        node.querySelector('.groupbody-model').style.display= 'none';
    }


    displayPopupInvite=event=>{
        const node = ReactDOM.findDOMNode(this);
        node.querySelector('.invitebody-model').style.display= 'flex';
    }

    closePopupInvite= event =>{
        const node = ReactDOM.findDOMNode(this);
        node.querySelector('.invitebody-model').style.display= 'none';
    }



    displaySettings=event=>{
        const node = ReactDOM.findDOMNode(this);
        node.querySelector('.bg-settings').style.display= 'flex';
    }

    closeSettings= event =>{
        const node = ReactDOM.findDOMNode(this);
        node.querySelector('.bg-settings').style.display= 'none';
    }


    collapseRoomsettings = (e) => {
        const node = ReactDOM.findDOMNode(this);
        let contentRoomSettings = node.querySelector(".user-side-bar");
        let contentSidebar = node.querySelector(".content-sidebar");
        if (!contentSidebar.style.maxWidth && contentRoomSettings.style.maxWidth){
            contentRoomSettings.style.maxWidth = null;
            node.querySelector('.messagescreen').style.gridColumn="1/-1";
        }else if (contentSidebar.style.maxWidth && contentRoomSettings.style.maxWidth){
            contentRoomSettings.style.maxWidth = null;
            node.querySelector('.messagescreen').style.gridColumn="2/-1";
        }else if (!contentSidebar.style.maxWidth && !contentRoomSettings.style.maxWidth){
            contentRoomSettings.style.maxWidth = "inherit";
            contentSidebar.style.maxWidth= null;
            node.querySelector('.messagescreen').style.gridColumn="1/-2";
        }else{
            contentRoomSettings.style.maxWidth = "inherit";
            contentSidebar.style.maxWidth= null;
            node.querySelector('.messagescreen').style.gridColumn="2/-2"
        }
    };


    collapseSidebar = (e) => {
        const node = ReactDOM.findDOMNode(this);
        let contentRoomSettings = node.querySelector(".user-side-bar");
        let contentSidebar = node.querySelector(".content-sidebar");
        if (contentSidebar.style.maxWidth && !contentRoomSettings.style.maxWidth){
            contentSidebar.style.maxWidth = null;
            node.querySelector('.messagescreen').style.gridColumn="1/-1";
        }else if (contentSidebar.style.maxWidth && contentRoomSettings.style.maxWidth){
            contentSidebar.style.maxWidth = null;
            node.querySelector('.messagescreen').style.gridColumn="1/-2";
        }else if (!contentSidebar.style.maxWidth && !contentRoomSettings.style.maxWidth){
            contentSidebar.style.maxWidth = "inherit";
            contentRoomSettings.style.maxWidth = null;
            node.querySelector('.messagescreen').style.gridColumn="2/-1";
        }else {
            contentSidebar.style.maxWidth = "inherit";
            contentRoomSettings.style.maxWidth = null;
            node.querySelector('.messagescreen').style.gridColumn="2/-2"
        }
    };

    render() {
        return (
            <div className="app">
                <MessageScreen currentuser={this.state.currentUser} messages={this.state.messages}
                               imageId={this.state.imageId} currentRoom ={this.state.currentRoom}/>
                <ChatForm sendMsg={msg => this.sendMsg(msg)} displayPopup={this.displayPopup}/>
                <Header curentRoom={this.state.currentRoom}
                        collapseSidebar={this.collapseSidebar}
                        currentroomID={this.state.currentRoomId}
                        displaySettings={this.displaySettings}
                        displayRoomSettings={this.collapseRoomsettings}
                        currentroomName={this.state.currentroomName}
                        displayPopupInvite={this.displayPopupInvite}/>
                <SendPicPopUp
                    closePopup={this.closePopup}
                    fileSelectedHandlar={this.fileSelectedHandlar}
                    imageUploadHandler={this.imageUploadHandlar}
                    />

                <RoomSettings
                    leaveRoom={roomId => this.leaveroomID()}
                    deleteRoom={roomId => this.deleteRoom()}
                    addUserToRoom={user => this.addUserToRoom(user)}
                    removeUserFromRoom={user => this.removeUserFromRoom(user)}/>
                <UsersSideBar users={this.state.users}/>
                <Sidebar 
                    displayPopupGroup={e=>this.displayPopupGroup()}
                    currentroomID={this.state.currentRoomId}
                    joinedRooms={this.state.joinedRooms} 
                    subscribeToRoom={roomId=>this.subscribeToRoom(roomId)}/>


            <div className={"groupbody-model"}>
                    <div className={"groupbody"}>
                    <div className="close" onClick={this.closePopupGroup}>+</div>
                    <Group closepop={this.closePopupGroup} joinaroom={roomid=>this.joinaroom(roomid)} currentUser={this.state.currentUser} createRoom={name=>this.createRoom(name)}/>
                    </div>
                </div>

                <div className={"invitebody-model"}>
                    <div className={"invitebody"}>
                    <div className="close" onClick={this.closePopupInvite}>+</div>
                    <div className="invlink">
                        <p>Copy link and send to friend!</p>
                    <input className="createinvinput"type="text"value={this.state.currentRoomId}/>
                    <CopyToClipboard text={this.state.currentRoomId}>
                    <button id="copybtn">Copy</button>
                  </CopyToClipboard>
                    </div>
                    </div>
                </div>

                <Roomsettings   leaveRoom={roomId=>this.leaveroomID()} 
                                joinroom={roomId=>this.joinaroom(roomId)}
                                addusertoroom={user=>this.addusertoroom(user)}
                                removeUserFromRoom={user=>this.removeUserFromRoom(user)}
                                users={this.state.users}/>
                
            </div>
        );
    }
}

export default ChatScreen;
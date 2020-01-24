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
class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state={
            currentUser:null,
            messages:[],
            currentRoomId:this.props.currentRoomId,
            selectedImage:null,
            currentroomName: this.props.currentRoomName,
            imageId: null,
            joinedRooms: [],
            users: [],
            hideNav: false,
            joinedRooms:[],
            users:[] 
        }
    }


    componentDidMount() {
        this.props.model.login()
        .then(currentUser => {
            this.setState({
                currentUser: currentUser,
                joinedRooms: currentUser.rooms
            })
        })
        .catch(err => console.log('error on subscribing: ', err));
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    resize() {
        const node = ReactDOM.findDOMNode(this);
        let contentSidebar = node.querySelector(".content-sidebar");
        let contentRoomSettings = node.querySelector(".user-side-bar");
        let currentHideNav = (window.innerWidth <= 760);
        if (currentHideNav !== this.state.hideNav) {
            this.setState({hideNav: currentHideNav});
            contentSidebar.style.gridArea="2/1/-1/-1";
            contentRoomSettings.style.gridArea="2/1/-1/-1";
            contentSidebar.style.width = "null";
        }else{
            contentSidebar.style.gridArea="sidebar";
            contentRoomSettings.style.gridArea="Roomsetting"
            node.querySelector('.messagescreen').style.gridColumn = "2/-1";
        }
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
                    messages: []
                })
                console.log(`Left room with ID: ${room.id}`);
            })
            .catch(err => {
                console.log(`Error leaving room ${this.state.currentRoomId}: ${err}`)
            })
    }

    deleteRoom() {
        this.state.currentUser.deleteRoom({roomId: this.state.currentRoomId})
            .then(() => {
                console.log(`Deleted room with ID: ${this.state.currentRoomId}`)})
            .catch(err => {
                console.log(`Error deleted room ${this.state.currentRoomId}: ${err}`)
            })
      }
    joinaroom(roomid){
     this.state.currentUser.joinRoom({ roomId:roomid})
    .then(room => {
        console.log(`Joined room with ID: ${room.id}`)
      })
      .catch(err => {
        console.log(`Error joining room ${roomid}: ${err}`)
      })
    }

    addUserToRoom = (userName) => {
        this.state.currentUser.addUserToRoom({
            userId: userName,
            roomId: this.state.currentRoomId
        }).then(() => {
            this.sendMsg(`${this.state.currentUser.name} added ${userName} to room.112`)
            this.subscribeToRoom(this.state.currentRoomId);
        }).then(() => {
            console.log(`Added User to room ${this.state.currentRoomId}`)
        }).catch(err => {
            console.log(`Error adding User to room 123: ${this.state.currentRoomId} ${err}`)
        })
    }

    removeUserFromRoom = (userName) => {
        this.state.currentUser.removeUserFromRoom({
            userId: userName,
            roomId: this.state.currentRoomId
          })
            .then(() => {
              console.log(`Removed User to room ${this.state.currentRoomId}`)
            }).then(()=>{
                this.sendMsg(`${this.state.currentUser.name} has removed ${userName}112`)
              })
            .catch(err => {
              console.log(`Error Removing User from room: ${this.state.currentRoomId} ${err}`)
            })
    }

   

    subscribeToRoom(roomId) {
        this.state.messages = [];
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
        }).then(currentRoom => {
            this.setState({
                currentRoomId: currentRoom.id,
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
   
    imageUploadHandler= event=>{
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
        if (this.state.hideNav){
            e.target.classList.toggle("active");
            if (contentRoomSettings.style.width) {
                contentRoomSettings.style.width = null;
                contentSidebar.maxWidth=null;
                node.querySelector('.messagescreen').style.gridColumn = "1/-1";
                node.querySelector('.messagescreen').style.width = "inherit";
            
            } else{
                contentRoomSettings.style.gridArea="2/1/-1/-1";
                contentSidebar.width=null;
                contentRoomSettings.style.width = "100%";
                node.querySelector('.messagescreen').style.width = "0px";
            } 
        }else{
            if (contentRoomSettings.style.width) {
                contentRoomSettings.style.width = null;
                node.querySelector('.messagescreen').style.gridColumn = "2/-1";
            }else {
                contentRoomSettings.style.width= "250px";

                node.querySelector('.messagescreen').style.gridColumn = "2/-2"
            }
        }
    };

    collapseSidebar = (e) => {
        const node = ReactDOM.findDOMNode(this);
        let contentRoomSettings = node.querySelector(".user-side-bar");
        let contentSidebar = node.querySelector(".content-sidebar");
        if (this.state.hideNav){
            e.target.classList.toggle("active");
            if (contentSidebar.style.width) {
                contentSidebar.style.width = null;
                contentRoomSettings.style.width=null;
                node.querySelector('.messagescreen').style.gridColumn = "1/-1";
                node.querySelector('.messagescreen').style.width = "inherit";
            } else{
                contentSidebar.style.gridArea="2/1/-1/-1";
                contentRoomSettings.style.width=null;
                contentSidebar.style.width = "100%";
                node.querySelector('.messagescreen').style.width = "0px";
            }
        }
    }

    render() {
        return (
            <div className="app">
                <MessageScreen currentuser={this.state.currentUser} messages={this.state.messages}
                               imageId={this.state.imageId}/>
                <ChatForm sendMsg={msg => this.sendMsg(msg)} displayPopup={this.displayPopup}/>
                <Header curentRoom={this.state.currentRoom}
                        collapseSidebar={this.collapseSidebar}
                        currentroomID={this.state.currentRoomId}
                        displaySettings={this.displaySettings}
                        displayRoomSettings={this.collapseRoomsettings}
                        collapseSidebar={this.collapseSidebar}
                        displayPopupInvite={this.displayPopupInvite}/>
                <div className={"bg-modal"}>
                    <div className={"modal-pop-up"}>
                        <div className="close" onClick={this.closePopup}>+</div>
                        <img className={"add-image-icon-form"}
                            src ={ require('../images/attachment.png')} 
                            alt ={"could not load image"}/>
                        <div>
                    <label for="files" className={"btn"}>Select file to send</label>
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
                    <Group closepop={this.closePopup1} joinaroom={roomid=>this.joinaroom(roomid)} currentUser={this.state.currentUser} createRoom={name=>this.createRoom(name)}/>
                    </div>
                </div>

                <div className={"invitebody-model"}>
                    <div className={"invitebody"}>
                    <div className="close" onClick={this.closePopupInvite}>+</div>
                    <div className="invlink">
                        <p>Copy link and send to friend!</p>
                    <input className="createinvinput"type="text"placeholder="Enter room first!" value={this.state.currentRoomId}/>
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
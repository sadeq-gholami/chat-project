import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MessageScreen from '../Presentation/MessageScreen';
import Sidebar from '../Presentation/Sidebar';
import ChatForm from '../Presentation/ChatForm';
import Header from '../Presentation/Header';
import UsersSideBar from '../Presentation/UsersSideBar';
import RoomSettings from "../Presentation/Roomsettings";


class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            messages: [],
            currentRoomId: null,
            selectedImage: null,
            imageId: null,
            joinedRooms: [],
            users: [],
            hideNav: false
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
        }).then(() => {
            console.log(`Removed User from room ${this.state.currentRoomId}`)
        }).then(() => {
            this.sendMsg(`${this.state.currentUser.id} has removed ${userName} from room.112`)
            this.subscribeToRoom(this.state.currentRoomId);
        }).catch(err => {
            console.log(`Error Removing User from room: ${this.state.currentRoomId} ${err}`)
        })
    };

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
                users: currentRoom.users
            })
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

    };

    imageUploadHandler = event => {
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

    popupRoomSettings = event => {
        const node = ReactDOM.findDOMNode(this);
        node.querySelector('.bg-modal2').style.display = 'flex';
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
                <Header curentRoom={this.state.currentRoom} displayPopup={this.collapseRoomsettings}
                        popupRoomSettings={this.popupRoomSettings}
                        collapseSidebar={this.collapseSidebar}/>
                <div className={"bg-modal"}>
                    <div className={"modal-pop-up"}>
                        <div className="close" onClick={this.closePopup}>+</div>
                        <img className={"add-image-icon-form"}
                             src={require('../images/bluecamera.png')}
                             alt={"could not load image"}/>
                        <div>
                            <label for="files" className={"btn"}>Select JPG/png Image to send</label>
                            <input type="file"
                                   style={{visibility: "hidden"}}
                                   id="files"
                                   onChange={this.fileSelectedHandlar}/>
                        </div>
                        <button className={"btn"}
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
                <Sidebar currentroomID={this.state.currentRoomId} joinedRooms={this.state.joinedRooms}
                         subscribeToRoom={roomId => this.subscribeToRoom(roomId)}/>
            </div>
        );
    }
}

export default ChatScreen;
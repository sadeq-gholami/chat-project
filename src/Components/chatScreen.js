import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MessageScreen from '../Presentation/MessageScreen';
import Sidebar from '../Presentation/Sidebar';
import ChatForm from '../Presentation/ChatForm';
import Header from '../Presentation/Header';
import Group from '../Presentation/Group';
import Roomsettings from '../Presentation/Roomsettings';

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
            currentRoom: null
        }
    }

    update() {}

    componentDidMount() {
        console.log(this.props.match.params.userName)
        this.props.model.logIn(this.props.match.params.userName).then(res => {
            this.start();
        });
    }

    start = () => {
        this.props.model.connectToAPI(this.props.match.params.userName).then(
            currentUser => {
                this.setState({

                    currentUser: currentUser,
                    joinedRooms: currentUser.rooms
                })
            })
            .catch(err => console.log('error on subscribing: ', err));
    }

    sendMsg = (text) => {
        this.props.model.sendMessage(text, this.state.currentUser);
    };
    createRoom = (name) => {
        this.state.currentUser.createRoom({
            name
        })
            .then(room => this.subscribeToRoom(room.id))
            .catch(err => console.log(err))
    }

    leaveroomID() {
        this.state.currentUser.leaveRoom({roomId: this.state.currentRoomId})
            .then(room => {
                this.setState({
                    joinedRooms: this.state.currentUser.rooms,
                    messages: []
                });
                console.log(`Left room with ID: ${room.id}`);
            })
            .catch(err => {
                console.log(`Error leaving room ${this.state.currentRoomId}: ${err}`)
            })
    }

    deleteRoom() {
        this.state.currentUser.deleteRoom({roomId: this.state.currentRoomId})
            .then(() => {
                console.log(`Deleted room with ID: ${this.state.currentRoomId}`)
            })
            .catch(err => {
                console.log(`Error deleted room ${this.state.currentRoomId}: ${err}`)
            })
    }

    addusertoroom = (userName) => {
        this.state.currentUser.addUserToRoom({
            userId: userName,
            roomId: this.state.currentRoomId
        }).then(() => {
            console.log(`Added User to room ${this.state.currentRoomId}`)
        }).catch(err => {
            console.log(`Error adding User to room 123: ${this.state.currentRoomId} ${JSON.stringify(err)}`)
        });
    };

    removeUserFromRoom = (userName) => {
        console.log("remove user called" + userName);
        this.state.currentUser.removeUserFromRoom({
            userId: userName,
            roomId: this.state.currentRoomId
        }).then(() => {
            console.log(`Removed User to room ${this.state.currentRoomId}`)
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
        })
            .then(currentRoom => {
                this.setState({
                    currentRoomId: currentRoom.id,
                    currentRoom: currentRoom
                })
                console.log(this.state.currentRoom.users)
                return this.state.currentUser.getJoinableRooms()
                    .then(joinableRooms => {
                        this.setState({
                            availableRooms: joinableRooms,
                            takenRooms: this.state.currentUser.rooms
                        })
                    })
            })
            .catch(err => console.log('error on subscribing: ', err))
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
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.sendMsg("10101" + data.createdPicture.imgUrl);
                this.closePopup();
            })
            .catch(error => console.error('error', error));
    }

    displayPopup = event => {
        const node = ReactDOM.findDOMNode(this);
        node.querySelector('.bg-modal').style.display = 'flex';
    }

    closePopup = event => {
        const node = ReactDOM.findDOMNode(this);
        node.querySelector('.bg-modal').style.display = 'none';
    }

    render() {
        return (
            <div className="app">
                <MessageScreen messages={this.state.messages} imageId={this.state.imageId}/>
                <Sidebar joinedRooms={this.state.joinedRooms} subscribeToRoom={roomId => this.subscribeToRoom(roomId)}/>
                <ChatForm sendMsg={msg => this.sendMsg(msg)} displayPopup={this.displayPopup}/>
                <Group createRoom={name => this.createRoom(name)}/>
                <Header/>
                <div className={"bg-modal"}>
                    <div className={"modal-pop-up"}>
                        <div className="close" onClick={this.closePopup}>+</div>
                        <img className={"add-image-icon-form"}
                             src={require('../images/imageIcon.png')}
                             alt={"could not load image"}/>
                        <input className={"btn"} type="file"
                               onChange={this.fileSelectedHandlar}/>

                        <button className={"btn"}
                                onClick={this.imageUploadHandler}>
                            upload
                        </button>
                    </div>
                </div>
                {this.state.currentRoom == null ? '' :
                    <Roomsettings leaveRoom={roomId => this.leaveroomID()}
                                  deleteRoom={roomId => this.deleteRoom()}
                                  addusertoroom={user => this.addusertoroom(user)}
                                  removeUserFromRoom={user => this.removeUserFromRoom(user)}
                                  users={this.state.currentRoom.users}/>
                }
            </div>
        );
    }
}

export default ChatScreen;
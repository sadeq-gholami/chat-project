import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MessageScreen from '../Presentation/MessageScreen';
import Sidebar from '../Presentation/Sidebar';
import ChatForm from '../Presentation/ChatForm';
import Header from '../Presentation/Header';
import Group from '../Presentation/Group';
import Roomsettings from '../Presentation/Roomsettings'; 
import {CopyToClipboard} from 'react-copy-to-clipboard';
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
    joinaroom(roomid){
     this.state.currentUser.joinRoom({ roomId:roomid})
    .then(room => {
        console.log(`Joined room with ID: ${room.id}`)
      })
      .catch(err => {
        console.log(`Error joining room ${roomid}: ${err}`)
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
                this.sendMsg(`${this.state.currentUser.name} has removed ${userName}112`)
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
           this.sendMsg("10101" + data.url);
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

    displayPopup1=event=>{
        const node = ReactDOM.findDOMNode(this);
        node.querySelector('.bg-modal1').style.display= 'flex';
    }

    closePopup1= event =>{
        const node = ReactDOM.findDOMNode(this);
        node.querySelector('.bg-modal1').style.display= 'none';
    }
    displayPopup2=event=>{
        const node = ReactDOM.findDOMNode(this);
        node.querySelector('.bg-modal2').style.display= 'flex';
    }

    closePopup2= event =>{
        const node = ReactDOM.findDOMNode(this);
        node.querySelector('.bg-modal2').style.display= 'none';
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
                <MessageScreen
                currentuser={this.state.currentUser} messages = {this.state.messages} imageId={this.state.imageId}/>
                <Sidebar displayPopup={e=>this.displayPopup1()} currentroomID={this.state.currentRoomId}joinedRooms={this.state.joinedRooms} subscribeToRoom={roomId=>this.subscribeToRoom(roomId)}/>
                <ChatForm sendMsg = {msg => this.sendMsg (msg)} displayPopup={this.displayPopup}/>
                
                <Header  currentroomID={this.state.currentRoomId}displayPopup1={this.displayPopup2} displayPopup={this.collapseRoomsettings} collapseSidebar={this.collapseSidebar}/>


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


                <div className={"bg-modal1"}>
                    <div className={"modal-pop-up1"}>
                    <div className="close" onClick={this.closePopup1}>+</div>
                    <Group closepop={this.closePopup1} joinaroom={roomid=>this.joinaroom(roomid)} currentUser={this.state.currentUser} createRoom={name=>this.createRoom(name)}/>
                    </div>
                </div>

                <div className={"bg-modal2"}>
                    <div className={"modal-pop-up2"}>
                    <div className="close" onClick={this.closePopup2}>+</div>
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
import Chatkit from '@pusher/chatkit-client'
import Observable from "./Observable";
import {tokenUrl, instanceLocator} from "./config.js"


export default class ChatModel extends Observable {
   constructor(){
       super();
       this.messages =[];
       this.currentRoomId=  null;
       this.currentUser = null;  //contains functions for interacting with the API
       this.availableRooms= [];
       this.takenRooms = [];
       this.userName="";
    
   }
   logIn(username){
    this.userName=username;
    console.log(username)
    fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
       'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
       })
       .then(response => {
           
       })
     .catch(error => console.error('error', error))
   }
   init(user){
    const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: "Sadeq",
            tokenProvider: new Chatkit.TokenProvider({
                 url: 'http://localhost:3001/authenticate'
        })

    })
    return chatManager.connect()
    .then(currentUser => {
        console.log(currentUser)
        return currentUser
        })           
    .catch(err => console.log('Failed to connect: ', err))
}
roomStatus(currentUser){
    return currentUser.getJoinableRooms()
        .then(availableRooms => {
                return availableRooms;
            })
}
setCurrentRoomId(id){
    this.currentRoomId= id;
}
getCurrentRoomId(){
   return this.currentRoomId;
}
setCurrentUser(currentUser){
    this.currentUser = currentUser;
    this.notifyObservers(currentUser);
}
getMessages(){
    return this.state.messages;
}
sendMessage(text, currentUser) {
    console.log(this.state.currentRoomId)
    currentUser.sendMessage({
        text,
        roomId: this.state.currentRoomId
    })
}
createRoom(name) {
    this.currentUser.createRoom({
        name
    })
    .then(room => this.subscribeToRoom(room.id))
    .catch(err => console.log(err))

}
subscribeToRoom(roomId ,currentUser) {
    this.messages= [];
    return currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
            onMessage: message => {
                   return message.text;
            }
        }
    })
     /** .then(currentRoom => {
       // this.setState({currentRoomId: currentRoom.id})
        this.setCurrentRoomId(currentRoom.id);
        
    });
        
        return currentUser.getJoinableRooms()
        .then(availableRooms => {
            this.availableRooms = availableRooms;
            this.takenRooms= currentUser.rooms;
            })*/
    .catch(err => console.log('error on subscribing: ', err))
}
}

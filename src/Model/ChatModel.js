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
   }
    
   init(){
    const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: '8869',
            tokenProvider: new Chatkit.TokenProvider({
                url: tokenUrl
        })

    })
    return chatManager.connect()
    .then(currentUser => {
        return currentUser
        /***/
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

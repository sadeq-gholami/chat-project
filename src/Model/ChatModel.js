import Chatkit from '@pusher/chatkit-client'
import Observable from "./Observable";
import {tokenUrl, instanceLocator} from "../config.js"


export default class ChatModel extends Observable {
   constructor(){
       super();
       this.state={
       messages :[],
       currentRoomId:  null,
       currentUser : null,  //contains functions for interacting with the API
       availableRooms: [],
       takenRooms: []
       }
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
        //return this.currentUser.getJoinableRooms()
      /*  .then(availableRooms => {
                this.availableRooms= availableRooms;
                this.takenRooms= this.currentUser.rooms;
            })*/
        })           
    .catch(err => console.log('Failed to connect: ', err))
}
setCurrentRoomId(id){
    this.state.currentRoomId= id;
}
getCurrentRoomId(){
   return this.state.currentRoomId;
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
    currentUser.subscribeToRoom({

        roomId: roomId,
        hooks: {
            onMessage: message => {
                console.log("message.text:", message.text)
                    //this.messages= [...this.state.messages, message]
            }
        }
    })
    .then(currentRoom => {
       // this.setState({currentRoomId: currentRoom.id})
        this.setCurrentRoomId(currentRoom.id);
        
    });
        
        return currentUser.getJoinableRooms()
        .then(availableRooms => {
            this.availableRooms = availableRooms;
            this.takenRooms= currentUser.rooms;
            })
    .catch(err => console.log('error on subscribing: ', err))
}
}



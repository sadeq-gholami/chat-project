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
       this.images=[]; 
   }
   logIn(username){

    return fetch('https://chat-application-api.herokuapp.com/chatkit/users', {
        method: 'POST',
        headers: {
       'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
       })
       .then(response => {
          return response;
       })
     .catch(error => console.error('error', error))
   }
  
   connectToAPI(user){
    const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: user,
            tokenProvider: new Chatkit.TokenProvider({
                 url: 'https://chat-application-api.herokuapp.com/chatkit/authenticate'
        })
    })
    return chatManager.connect()
    .then(currentUser => {
        return currentUser
        })           
    .catch(err => console.log('Failed to connect: ', err))
}

setImages(messages){
    messages.map(message => {
        if(message.text.includes(10101)){
            this.images.push("https://chat-application-api.herokuapp.com/" + message.text.substr(5))
        }
    });
    console.log(this.images)
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
getCurrentUser(){
    return this.currentUser;
}
getMessages(){
    return this.messages;
}
sendMessage(text, currentUser) {
    currentUser.sendMessage({
        text,
        roomId: this.currentRoomId
    })
}
createRoom(name) {
    this.currentUser.createRoom({
        name
    })
    .then(room => this.subscribeToRoom(room.id))
    .catch(err => console.log(err))

}
}

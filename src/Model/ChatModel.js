import Chatkit from '@pusher/chatkit-client'
import Observable from "./Observable";
import {tokenUrl, instanceLocator} from "./config.js"


export default class ChatModel extends Observable {
   constructor(){
       super();
       this.messages =[];
       this.currentRoomId=  null;
       this.availableRooms= [];
       this.takenRooms = [];
       this.images=[]; 
       this.username= sessionStorage.getItem("username");
       this.password= sessionStorage.getItem("password");
       this.avatarUrl="";
   }
   signup(){
    return fetch('https://chat-application-api.herokuapp.com/chatkit/users', {
        method: 'POST',
        headers: {
       'Content-Type': 'application/json',
        },
        body: JSON.stringify({
              username:this.username,
              password:this.password,
              avatarURL:this.avatarUrl
            })
       })
       .then(response => {
          return response;
       })
     .catch(error => console.error('error', error))
   }
  
   login(){
    const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: this.username,
            tokenProvider: new Chatkit.TokenProvider({
                 url: 'https://chat-application-api.herokuapp.com/chatkit/users/login',
                 headers: {
                    username:this.username,
                    password:this.password
                  }
        })
    })
    return chatManager.connect()
    .then(currentUser => {
        return currentUser
        })         
    .catch(err => console.log('Failed to connect: ', err))
}

   

setImages(messages){
    this.images=[];
    messages.map(message => {
        if(message.text.includes(10101)){
            this.images.push(message.text.substr(5))
        }
    });
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

setUsername(username){
    this.username = username;
}
getUsername(){
    return this.username;
}

setPassword(password){
    this.password = password;
}
getPassword(){
    return this.password;
}

setAvatarUrl(avatarUrl){
    this.avatarUrl = avatarUrl;
}
getAvatarUrl(){
    return this.avatarUrl
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

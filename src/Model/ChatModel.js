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
        this.userId =sessionStorage.getItem("userId");
    }


    signup(){
        return fetch('http://localhost:3001/chatkit/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: this.userId,
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
                userId: this.userId,
                tokenProvider: new Chatkit.TokenProvider({
                    url: 'http://localhost:3001/chatkit/users/login',
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


    setUserId(userId){
        this.userId = userId;
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



    sendMessage(text, currentUser) {
        currentUser.sendMessage({
            text,
            roomId: this.currentRoomId
        })
    }

    setCurrentRoomId(id){
        this.currentRoomId= id;
    }
}

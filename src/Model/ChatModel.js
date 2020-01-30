import Chatkit from '@pusher/chatkit-client'
import Observable from "./Observable";
import {instanceLocator} from "../config";
export default class ChatModel extends Observable {
    constructor(){
        super();
        this.messages =[];
        this.currentRoomId=  null;
        this.images= JSON.parse(sessionStorage.getItem("images"));
        this.currentRoomName= sessionStorage.getItem("currentroomName");
        this.username= sessionStorage.getItem("username");
        this.password= sessionStorage.getItem("password");
        this.avatarUrl="";
        this.userId =sessionStorage.getItem("userId");
    }


    signup(){
        return fetch('https://chat-application-api.herokuapp.com/chatkit/users', {
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
                    url: 'https://chat-application-api.herokuapp.com/chatkit/users/login',
                    headers: {
                        userId:this.userId,
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
        sessionStorage.setItem("images",JSON.stringify(this.images));
    }


    setUserId(userId){
        this.userId = userId;
    }
    setCurrentRoomName(name){
        this.currentRoomName= name;
    }
    getCurrentRoomName(){
       return this.currentRoomName;
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

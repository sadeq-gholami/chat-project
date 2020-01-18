import React, {Component} from 'react';
import '../Styles/View Chatscreen Styles/Message.css';
import * as PropTypes from "prop-types";
import no_profile_picture from '../images/no_profile_picture.png'
import image_not_loaded from '../images/image_no_loaded.png'
import ImageWithDefault from "./ImageWithDefault";

class Message extends Component {



    render() {
        let {message, currentUser} = this.props;

        if (message.text.includes(112)) {
            return (
                <div className="event-message">
                    {message.text.slice(0, -3)}
                </div>

            );
        }
        if (message.text.includes(10101) && message.sender.name === currentUser.name) {
            return (
                <div className="userMessage">
                    <div className="message-name">
                        <ImageWithDefault source={message.sender.avatarURL} default={no_profile_picture} className="user-image"/>
                        {message.sender.name}
                        <img width="8 " src={require('../images/online.png')} alt={"no picture"}/>
                    </div>
                    <div className="message-time">{message.createdAt.slice(0, -4)}</div>
                    <a href={"https://chat-application-api.herokuapp.com/" + message.text.substr(5)} target="blank">
                        <img src={"https://chat-application-api.herokuapp.com/" + message.text.substr(5)}
                             alt={"could not load image"}
                             className="sent-image"/>
                    </a>
                </div>
            );
        }
        if (message.sender.name === currentUser.name) {
            return (
                <div className="userMessage">
                    <div className="message-name">
                        <ImageWithDefault source={message.sender.avatarURL} default={no_profile_picture} className="user-image"/>
                        {message.sender.name}
                        <img width="8 " src={require('../images/online.png')}/>
                    </div>
                    <div className="message-time"> {message.createdAt.slice(0, -4)}
                    </div>
                    <div className="message-text"> {message.text}
                    </div>
                </div>
            );
        }

        if (message.text.includes(10101)) {
            return (
                <div className="Message">
                    <div className="message-name">
                        <ImageWithDefault source={message.sender.avatarURL} default={no_profile_picture} className="user-image"/>
                        {message.sender.name}
                        <img width="8 " src={require('../images/online.png')}/>
                    </div>
                    <div className="message-time"> {message.createdAt.slice(0, -4)} </div>
                    <a href={"https://chat-application-api.herokuapp.com/" + message.text.substr(5)} target="blank">
                        <ImageWithDefault source={"https://chat-application-api.herokuapp.com/" + message.text.substr(5)}
                                          default={image_not_loaded}
                             alt={"could not load image"}
                             className="sent-image"/>
                    </a>
                </div>
            );
        }

        if (message.sender.presence.state === "online") {
            return (
                <div className="Message">
                    <div className="message-name">
                        <ImageWithDefault source={message.sender.avatarURL} default={no_profile_picture} className="user-image"/>
                        {message.sender.name}
                        <img width="8 " src={require('../images/online.png')}/>
                    </div>
                    <div className="message-time">{message.createdAt.slice(0, -4)}</div>
                    <div className="message-text">{message.text}</div>
                </div>
            );
        }

        return (
            <div className="Message">
                <div className="message-name">
                    <ImageWithDefault source={message.sender.avatarURL} default={no_profile_picture} className="user-image"/>
                    {message.sender.name}
                </div>
                <div className="message-time"> {message.createdAt.slice(0, -4)}
                </div>
                <div className="message-text"> {message.text} </div>
            </div>
        );
    }
}

Message.propTypes = {
    message: PropTypes.any,
    currentUser: PropTypes.any
};

export default Message;
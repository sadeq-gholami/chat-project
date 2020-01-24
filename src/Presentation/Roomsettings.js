import React, {Component} from 'react';
import '../Styles/Gstyle.css';
import '../Styles/View Chatscreen Styles/RoomSetting.css'
import {Link} from "react-router-dom";
import ReactDOM from "react-dom";
import uuid from "react-uuid";


class RoomSettings extends Component {
    constructor() {
        super();
        this.state = {
            usernameToAdd: "",
            usernameToRemove: ""
        };
    }

    closePopup = event => {
        const node = ReactDOM.findDOMNode(this);
        node.querySelector('.bg-settings').style.display = 'none';
    };

    handleSubmitToAdd = (e) => {
        e.preventDefault();
        this.props.addUserToRoom(this.addUsername.value)
    };

    handleSubmitToRemove = (e) => {
        e.preventDefault();
        this.props.removeUserFromRoom(this.removeUsernameInput.value)
    };

    render() {
        return (
            <div className={"room-settings"}>
                <div className={"bg-settings"}>
                    <div className={"settings-popup"}>
                        <div className="close" onClick={this.closePopup}>+</div>
                        <table>
                            <thead>
                            <th/>
                            </thead>
                            <tbody>
                            <tr key={uuid()} >
                                <td>
                                    <form onSubmit={this.handleSubmitToAdd}>
                                        <input className={"room-setting-form"}
                                            placeholder="add user"
                                            type="text"
                                            ref={(addUsernameInput) => this.addUsername  = addUsernameInput}/>

                                        <button  type="submit"  key={uuid()} className="room-setting-btn green-btn">ADD
                                        </button>
                                    </form>
                                </td>
                            </tr>
                            <tr key={uuid()} class="border_bottom">
                                <td key={uuid()} >
                                    <form   onSubmit={this.handleSubmitToRemove}>
                                        <input
                                            className={"room-setting-form"}
                                            placeholder="remove user"
                                            type="text"
                                            ref={(removeUsernameInput) => this.removeUsernameInput  = removeUsernameInput}/>
                                        <button  type="submit"  key={uuid()} className="room-setting-btn red-btn">REMOVE
                                        </button>
                                    </form>
                                </td>
                            </tr>
                            <tr key={uuid()} >
                                <td key={uuid()} >
                                    <button  key={uuid()} id="addUserToRoom" className="room-setting-btn red-btn"
                                            onClick={this.props.leaveRoom}
                                            type="button">Leave room
                                    </button>
                                    <button  key={uuid()} id="addUserToRoom" className="room-setting-btn red-btn"
                                             onClick={this.props.deleteRoom}
                                             type="button">Delete room
                                    </button>
                                </td>
                            </tr>
                            <tr key={uuid()}>
                                <td>
                                    <Link to="/">
                                        <button className="room-setting-btn" type="button">sign out</button>
                                    </Link>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default RoomSettings;
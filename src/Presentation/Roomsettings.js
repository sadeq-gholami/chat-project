import React, {Component} from 'react';
import '../Styles/Gstyle.css';
import '../Styles/View Chatscreen Styles/RoomSetting.css'
import {Link} from 'react-router-dom';
import uuid from 'react-uuid'
import ImageWithDefault from "./ImageWithDefault";
import no_profile_picture from "../images/no_profile_picture.png";


class RoomSettings extends Component {
    constructor() {
        super();
        this.state = {
            usernameToAdd: "",
            usernameToRemove: ""
        };
    }


    handlechangeadd = (e) => {
        this.setState({usernameToAdd: e.target.value})
    }
    handlechangeremove = (e) => {
        this.setState({usernameToRemove: e.target.value})
    }


    handleSubmitToAdd = (e) => {
        e.preventDefault();
        this.props.addusertoroom(this.state.usernameToadd)
        this.setState({
            usernameToadd: ""
        })
    }
    handleSubmitToRemove = (e) => {
        e.preventDefault();
        this.props.removeUserFromRoom(this.state.usernameToRemove)
        this.setState({
            usernameToRemove: ""
        })
    }


    render() {
        return (

            <div className="content-room-settings">
                <form className="room-setting-form" onSubmit={this.handleSubmitToAdd}>
                    <input onChange={this.handlechangeadd}
                           value={this.state.usernameToadd}
                           placeholder="add user"
                           type="text"/>
                </form>

                <form className="room-setting-form" onSubmit={this.handleSubmitToRemove}>
                    <input onChange={this.handlechangeremove}
                           value={this.state.usernameToremove}
                           placeholder="remove user"
                           type="text"/>
                </form>


                <h3>users</h3>

                <div key={uuid()} className="user-box">
                    <table>
                        <thead><tr><th/><th/><th/></tr></thead>
                        <tbody>
                        {this.props.users.map((user) => {
                            return (
                                <tr key={uuid()}>
                                    <td><ImageWithDefault source={user.avatarURL} default={no_profile_picture}
                                                          className="user-image"/>
                                    </td>
                                    <td>
                                        <div key={uuid()} className="user-name">{user.name}</div>
                                    </td>
                                    <td>{user.presence.state === 'online' ?
                                        <img key={uuid()} className="status-image" width="8"
                                             src={require('../images/online.png')}/> :
                                        <img key={uuid()} className="status-image" width="8"
                                             src={require('../images/offline.png')}/>}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

                <div className={"roomSettingButtons"} >
                    <button id="addusertoroom" className="room-setting-btn" onClick={this.props.leaveRoom}
                            type="button">Leave room
                    </button>

                    <button id="addusertoroom" className="room-setting-btn" onClick={this.props.deleteRoom}
                            type="button">Delete room
                    </button>
                    <Link to="/">
                        <button className="room-setting-btn" type="button">sign out</button>
                    </Link>

                </div>


            </div>

        );
    }
}

export default RoomSettings;
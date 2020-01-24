import React, { Component } from 'react';
import '../Styles/Gstyle.css';
import '../Styles/View Chatscreen Styles/RoomSetting.css'
import uuid from "react-uuid"
import ImageWithDefault from "./ImageWithDefault";
import no_profile_picture from "../images/no_profile_picture.png";
import {Link} from 'react-router-dom';

class Roomsettings extends Component{
    constructor(){
        super();
        this.state= {
            usernameToadd: "",
            usernameToremove:"",
        }
    }


    handlechangeadd=(e)=>{
        this.setState({usernameToadd:e.target.value})
    }
    handlechangeremove=(e)=>{
        this.setState({usernameToremove:e.target.value})
    }


    
    handleSubmitToAdd=(e)=>{
        e.preventDefault();
        this.props.addusertoroom(this.state.usernameToadd)
        this.setState({
            usernameToadd:""
        })
    }
    handleSubmitToRemove=(e)=>{
        e.preventDefault();
        this.props.removeUserFromRoom(this.state.usernameToremove)
        this.setState({
            usernameToremove:""
        })
    }
 

        render(){
            return(
                
           <div className="content-room-settings">
                <form className ="room-setting-form" onSubmit={this.handleSubmitToAdd}>
                    <input  onChange ={this.handlechangeadd} 
                            value={this.state.usernameToadd}
                            placeholder="add user"
                            type="text"/>
                    </form>

                    <form className ="room-setting-form" onSubmit={this.handleSubmitToRemove}>
                    <input  onChange ={this.handlechangeremove} 
                            value={this.state.usernameToremove}
                            placeholder="remove user"
                            type="text"/>
                    </form>

                    <button id = "addusertoroom" className="room-setting-btn" onClick={this.props.leaveRoom} 
                    type="button" >Leave room <img className="leave" width ="20" src= {require('../images/leave room.png')}/>
                    </button> 
                    <Link to ="/">
                    <button className="room-setting-btn" type="button" >Sign out <img className="sign-out" width ="15" src= {require('../images/signout.png')}/></button> 
                    </Link>
                    <h3>users</h3>
                    <div key={uuid()} className="user-box">
                        <table > 
                            <thead><tr><th/><th/><th/></tr></thead>
                            <tbody>
                            {this.props.users.map((user) => {
                        return (
                        <tr key={uuid()}>
                            
                            <td><ImageWithDefault source={user.avatarURL} default={no_profile_picture}
                                          className="user-image"/>
                            </td>
                            <div className="content">
                            <td>
                                
                            <div key={uuid()} className="user-name">{user.name}</div>
                            </td>
                            
                            <span className="content-toolcard">
                                <ImageWithDefault source={user.avatarURL} default={no_profile_picture} className="user-pic"/>
                                 <div className="user-info">{user.name}
                                  <div className="user-id"> #{user.id}</div>
                                  </div>
                                  </span>
                            </div>
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
            </div>
         

            );
        }
       }
    export default Roomsettings; 
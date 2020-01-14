import React, { Component } from 'react';
import '../Styles/Gstyle.css';


class Roomsettings extends Component{
    constructor(){
        super();
        this.state= {
            usernameToadd: "",
            usernameToremove:""
        };
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
           
                <form className ="room-settings-form" onSubmit={this.handleSubmitToAdd}>
                    <input  onChange ={this.handlechangeadd} 
                            value={this.state.usernameToadd}
                            placeholder="add user to group"
                            type="text"/>
                    </form>

                    <form className ="room-settings-form" onSubmit={this.handleSubmitToRemove}>
                    <input  onChange ={this.handlechangeremove} 
                            value={this.state.usernameToremove}
                            placeholder="remove user from group"
                            type="text"/>
                    </form>

                    <button id = "addusertoroom" className="btn" onClick={this.props.leaveRoom} 
                    type="button" >Leave room
                    </button> 

                    <button id = "addusertoroom" className="btn" onClick={this.props.deleteRoom} 
                    type="button" >Delete room
                    </button> 
                    <h3>users</h3>
                    <div>
                        {this.props.users.map(user=>{
                        return (
                            <div className = "message-name">
                                <img src ={user.avatarURL} alt ={"no image"} style={{width:"30px", borderRadius:"50px"}}/>
                                <div>{user.name +" " + user.presence.state}</div>
                            </div>
                        )
                        })}
                    </div>
            </div>
         

            );
        }
       }
    export default Roomsettings; 
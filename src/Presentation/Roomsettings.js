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
                    placeholder="Enter Text"
                    type="text"/>
            </form>

            <form className ="room-settings-form" onSubmit={this.handleSubmitToRemove}>
            <input  onChange ={this.handlechangeremove} 
                    value={this.state.usernameToremove}
                    placeholder="Enter Text"
                    type="text"/>
            </form>

                 <button id = "addusertoroom" onClick={this.props.leaveRoom} 
                 type="button" >Leave room
                 </button> 

                 <button id = "addusertoroom" onClick={this.props.deleteRoom} 
                 type="button" >Delete room
                 </button> 
            </div>
         

            );
        }
       }
    export default Roomsettings; 
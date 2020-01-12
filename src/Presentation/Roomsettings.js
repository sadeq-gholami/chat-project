import React, {Component} from 'react';
import '../Styles/Gstyle.css';


class Roomsettings extends Component {
    constructor() {
        super();
        this.state = {
            usernameToadd: "",

        };
    }


    handlechangeadd = (e) => {
        this.setState({usernameToadd: e.target.value})
    }


    handleSubmitToAdd = (e) => {
        e.preventDefault();
        this.props.addusertoroom(this.state.usernameToadd)
        this.setState({
            usernameToadd: ""
        })
    }


    handleSubmitToRemove = (e, userid) => {
        this.props.removeUserFromRoom(userid);
    }


    render() {
        return (

            <div className="RoomSettings">
                <form className="123" onSubmit={this.handleSubmitToAdd}>
                    <table>
                        <tbody>
                        <tr key={"cc"}>
                            <td>
                                <input width="%50p" onChange={this.handlechangeadd}
                                       value={this.state.usernameToadd}
                                       placeholder="Username to add "
                                       type="text"/>
                            </td>
                            <td>
                                <button>
                                    <img key={"plus_image"}
                                         width="12"
                                         height="12"
                                         src="https://img.icons8.com/android/24/000000/plus.png"
                                         alt={"+"}/>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>

                <button id="leaveroom" onClick={this.props.leaveRoom}
                        type="button">Leave room
                </button>

                <button id="deleteroom" onClick={this.props.deleteRoom}
                        type="button">Delete room
                </button>

                {(this.props.users == null) || (this.props.users.length == 0) ? '' :
                    <table>
                        <tbody>
                        {this.props.users.map(user =>
                            <tr key={user.id + "tr"}>
                                <td key={user.id + "td_1"}>{user.id}</td>
                                <td key={user.id + "id_2"}>
                                    <button key={user.id + "remove"}
                                            onClick={(e) => this.handleSubmitToRemove(e, user.id)}>
                                        <img key={user.id + "cross_image"}
                                             width="12"
                                             height="12"
                                             src="https://img.icons8.com/material-sharp/50/000000/delete-sign.png"
                                             alt={"X"}/>
                                    </button>
                                </td>
                            </tr>)
                        }
                        </tbody>
                    </table>
                }
            </div>
        );

    }
}

export default Roomsettings;
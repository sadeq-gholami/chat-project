import React, {Component} from 'react';
import '../Styles/Gstyle.css';
import Members from "./Members";


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
                <Members {...this.props} users={this.props.users}/>
            </div>
        );
    }
}

export default Roomsettings;
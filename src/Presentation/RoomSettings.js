import React, {Component} from 'react';
import '../Styles/Gstyle.css';
import Members from "./Members";
import ReactDOM from "react-dom";

const  uuid = require('uuid/v1');

class RoomSettings extends Component {
    constructor() {
        super();
        this.state = {
            usernameToadd: "",
        };
    }

    closePopup = event => {
        const node = ReactDOM.findDOMNode(this);
        node.style.display = 'none';
    };


    handleChangeAdd = (e) => {
        this.setState({usernameToadd: e.target.value})
    };


    handleSubmitToAdd = (e) => {
        e.preventDefault();
        this.props.addusertoroom(this.state.usernameToadd);
        this.setState({
            usernameToadd: ""
        })
    };

    render() {
        return (
            <div className="RoomSettings">
                <div className="close" onClick={this.closePopup}>+</div>
                <table>
                    <tbody>
                    <tr key={ uuid()}>
                        <td key={uuid()}><p>room name: {this.props.room.name}</p></td>
                    </tr>
                    <tr key={ uuid()}>
                        <td key={uuid()}><input onChange={this.handleChangeAdd}
                               value={this.state.usernameToadd}
                               placeholder="Username to add "
                                   type="text"/></td>
                        <td key={uuid()}>  <button onClick={this.handleSubmitToAdd}>
                            <img key={ uuid()}
                                 width="12"
                                 height="12"
                                 src="https://img.icons8.com/android/24/000000/plus.png"
                                 alt={"+"}/>
                        </button></td>
                    </tr>

                    <tr key={ uuid()}>
                        <td key={uuid()}> <Members {...this.props} users={this.props.users}/></td>
                    </tr>

                    <tr key={ uuid()}>
                        <td key={uuid()}> <button id="leaveroom" onClick={this.props.leaveRoom}
                                type="button">Leave room
                        </button></td>
                            <td key={uuid()}> <button id="deleteroom" onClick={this.props.deleteRoom}
                                type="button">Delete room
                            </button></td>
                    </tr>
                    </tbody>
                </table>


            </div>
        );
    }
}

export default RoomSettings;
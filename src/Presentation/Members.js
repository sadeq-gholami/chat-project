import React, {Component} from "react";


const uuid = require('uuid/v1');

class Members extends Component {

    handleSubmitToRemove = (e, userid) => {
        this.props.removeUserFromRoom(userid);
    };

    render() {
        return <table>
            <tbody>
            {this.props.users.map(user =>
                <tr key={uuid()}>
                    <td key={uuid()}>{user.id}</td>
                    <td key={uuid()}>
                        <button key={uuid()}
                                onClick={(e) => this.handleSubmitToRemove(e, user.id)}>
                            <img key={uuid()}
                                 width="12"
                                 height="12"
                                 src="https://img.icons8.com/material-sharp/50/000000/delete-sign.png"
                                 alt={"X"}/>
                        </button>
                    </td>
                </tr>
            )
            }
            </tbody>
        </table>;
    }
}


export default Members;
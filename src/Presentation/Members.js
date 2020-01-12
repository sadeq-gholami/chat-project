import React, {Component} from "react";
import * as PropTypes from "prop-types";
import Roomsettings from "./Roomsettings";


class Members extends Component {


    handleSubmitToRemove = (e, userid) => {
        this.props.removeUserFromRoom(userid);
    };


    render() {
        return <table>
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
                </tr>
            )
            }
            </tbody>
        </table>;
    }
}


export default Members;
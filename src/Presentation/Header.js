import React, {Component} from 'react';
import '../Styles/View Chatscreen Styles/Header.css';
import {Link} from "react-router-dom";
class Header extends Component {
    state = { 
        copied: false
     }
    render() { 
        
        return ( 
           
        <div className="header">
                    <div className="title"> 
                    {this.props.currentroomName} 
                    <div className="settingicon">
                    <img  width="30" className={"settingicon"}
                        src ={ require('../images/settingicon.png')}
                        alt ={"could not load"}
                        onClick={this.props.displaySettings}/>
                        <span className="tooltiptext">Settings</span>
                        </div>
                    <div className="settingicon2">
                        <img width="30" className={"settingicon"}
                             src={require('../images/users.png')}
                             alt={"could not load"}
                             onClick={this.props.displayRoomSettings}/>
                    </div>

                    <div className="createinvicon">
                            <img  width="28" className={"createinvicon"}
                            src ={ require('../images/createinvicon.png')}
                            alt ={"could not load"}
                            onClick={this.props.displayPopupInvite}/>
                            <span className="tooltiptext">Create invite</span>
                            </div>

                    <Link to={"/photos"}>
                        <div  className="allpicture">   
                        <img  width="40" src={ require('../images/photos.png')} alt={"could not load"} />
                        <span class="photoicon">Photos</span>
                        </div>
                    </Link>

                    <div className="tabicon">
                    <img  width="30" src={ require('../images/tabicon.png') } 
                        onClick={this.props.collapseSidebar}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;

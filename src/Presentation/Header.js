import React, {Component} from 'react';
import '../Styles/View Chatscreen Styles/Header.css';
import {Link} from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
class Header extends Component {
    state = { 
        copied: false
     }
    render() { 
        
        return ( 
           
        <div className="header">
                    <img  width="50" className="crown-height"
                    src ={ require('../images/crown12.png')}
                    alt ={"could not load image"}/>
                    <div className="title"> 
                    {this.props.currentroomName} 
                    <div className="settingicon">
                    <img  width="30" className={"settingicon"}
                        src ={ require('../images/settingicon.png')}
                        alt ={"could not load image"}
                        onClick={this.props.displaySettings}/>
                        <span class="tooltiptext">Settings</span>
                        </div>
                    <div className="settingicon">
                        <img width="30" className={"settingicon"}
                             src={require('../images/users.png')}
                             alt={"could not load image"}
                             onClick={this.props.displayRoomSettings}/>
                    </div>

                    <div className="createinvicon">
                            <img  width="28" className={"createinvicon"}
                            src ={ require('../images/createinvicon.png')}
                            alt ={"could not load image"}
                            onClick={this.props.displayPopupInvite}/>
                            <span class="tooltiptext">Create invite</span>
                            </div>

                    <Link to={"/photos"}>
                        <div  className="allpicture">   
                        <img  width="40" src={ require('../images/pictureicon.png') } />
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

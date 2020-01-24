import React, { Component } from 'react';
import '../Styles/View Chatscreen Styles/Header.css';
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
                            onClick={this.props.displayPopup}/>
                            <span className="tooltiptext">setting</span>

                             </div>
                   
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
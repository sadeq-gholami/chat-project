import React, { Component } from 'react';

const Login= ({username, password, authorized, handleSubmit, handleUsernameChange, handlePasswordChange, displayPopup})=>{
    return(
                <div>
                    <div className= "innerbox">
                        <div className ="imageholder">
                            <img  width="140" src={ require('../images/loginicon.png') } />
                        </div>
                        <form className ="username" onSubmit={handleSubmit}>
                            <input  onChange ={handleUsernameChange} 
                                value={username}
                                placeholder="Enter username..."
                                type="text"/>
                            <input  onChange ={handlePasswordChange} 
                                value={password}
                                placeholder="Enter passowrd..."
                                type="password"/>
                            <div>
                                <button className = "tbtn" onClick={handleSubmit}>SIGN IN</button> 
                            </div>
                            <button className="tbtn" onClick={displayPopup}>SIGN UP</button>
                            <div>
                                {authorized
                                    ? <div/>
                                    : <div>wrong passowrd! try again!</div>
                                }
                            </div>
                            
                        </form>
                    </div>
                </div>
    );
}

export default Login;
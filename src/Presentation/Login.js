import React, { Component } from 'react';

const Login= ({username, password, authorized, handleSubmit, handleUsernameChange, handlePasswordChange, displayPopup})=>{
    return(
                <div>
                    <div className= "innerbox">
                        <div className ="imageholder">
                            <img  width="140" src={ require('../images/user1.png') } />
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
                                <button className = "tbtn" onClick={handleSubmit}>Sign in</button> 
                            </div>
                            <button className="tbtn" onClick={displayPopup}>Sign up</button>
                            <div>
                                {authorized
                                    ? <div/>
                                    : <div className="wrong"><b>Wrong password or username! Try again!</b></div>
                                }
                            </div>
                            
                        </form>
                    </div>
                </div>
    );
}

export default Login;
import React, { Component } from 'react';

const Login= ({userId, password, authorized, handleSubmit, handleUserIdChange, handlePasswordChange, displayPopup})=>{
    return(
                <div>
                    <div className= "innerbox">
                        <div className ="imageholder">
                            <img  width="140" src={ require('../images/user1.png') } />
                        </div>
                        <form className ="username" onSubmit={handleSubmit}>
                            <input  onChange ={handleUserIdChange} 
                                value={userId}
                                placeholder="Enter user id"
                                type="text"/>
                            <input  onChange ={handlePasswordChange} 
                                value={password}
                                placeholder="Enter passowrd..."
                                type="password"/>
                            <div>
                                <button className = "tbtn" onClick={handleSubmit}>SIGN IN</button> 
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
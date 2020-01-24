import React, { Component } from 'react';

const Login= ({userId, password, authorized, handleSubmit, handleUserIdChange, handlePasswordChange, displayPopup})=>{
    return(
                <div>
                    <div className= "innerbox">
                        <div className ="imageholder">
                            <img  width="140" src={ require('../images/loginicon.png') } />
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
                                <button className = "tbtn" onClick={handleSubmit}>Sign in</button> 
                            </div>
                            <button className="tbtn" onClick={displayPopup}>sign up</button>
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
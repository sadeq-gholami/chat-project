import React from 'react';

const SignupPopup = ({username, password, imageUploadHandler, fileSelectedHandlar, closePopup,handleUsernameChange, handlePasswordChange})=>{
    return(
        <div className={"bg-modal"}>
            <div className={"modal-pop-up"}>
                <div className="close"  onClick={closePopup}>+</div>
                <form onSubmit={imageUploadHandler}>
                    <input className={"btn btn-input"}
                        onChange ={handleUsernameChange} 
                        value={username}
                        placeholder="username..."
                        type="text"/>
                    <input className={"btn btn-input"}  onChange ={handlePasswordChange} 
                        value={password}
                        placeholder="passowrd..."
                        type="password"/>
                    <input  className={"btn"} type="file"
                            placeholder="select avatar..."
                        onChange={fileSelectedHandlar}/>

                    <button  className={"btn"} 
                        onClick={imageUploadHandler}>
                            Sign Up
                            </button>   
                </form>
            </div>
        </div>
    );
}

export default SignupPopup;
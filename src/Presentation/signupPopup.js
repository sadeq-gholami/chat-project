import React from 'react';

const SignupPopup = (
    {userId, username, password, imageUploadHandler, 
    fileSelectedHandlar, closePopup,handleUsernameChange, 
    handlePasswordChange, handleUserIdChange
})=>{
    return(
        <div className={"bg-modal"}>
            <div className={"modal-pop-up"}>
                <div className="close"  onClick={closePopup}>+</div>
                <form onSubmit={imageUploadHandler}>
                    <input className={"btn btn-input"}
                        onChange ={handleUserIdChange} 
                        value={userId}
                        placeholder="user Id...."
                        type="text"/>
                    <input className={"btn btn-input"}
                        onChange ={handleUsernameChange} 
                        value={username}
                        placeholder="username..."
                        type="text"/>
                    <input className={"btn btn-input"}  onChange ={handlePasswordChange} 
                        value={password}
                        placeholder="passowrd..."
                        type="password"/>
                    <div>
                    <label for="files" className={"btn"}>Select Avatar Image</label>
                    <input   type="file"
                             style={{visibility:"hidden"}}
                             id="files"
                        onChange={fileSelectedHandlar}/>
                    </div>

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
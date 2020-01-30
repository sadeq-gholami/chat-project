import React from 'react';

const SendPicPopUp = (
    {closePopup, fileSelectedHandlar, imageUploadHandler
})=>{
    return(
        <div className={"bg-modal"}>
            <div className={"modal-pop-up"}>
                <div className="close" onClick={closePopup}>+</div>
                <img className={"add-image-icon-form"}
                        src ={ require('../images/attachment.png')} 
                        alt ={"could not load image"}/>
                <div>
                    <label for="files" className={"btn"}>Select file to send</label>
                    <input   type="file"
                             style={{visibility:"hidden"}}
                             id="files"
                             onChange={fileSelectedHandlar}/>
                </div>
                <button  className={"btn"} onClick={imageUploadHandler}>
                    upload
                </button>
            </div>
        </div>
    );
}

export default SendPicPopUp;
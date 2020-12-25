import React, { useState } from 'react'
import './ProfileUpdater.css'
import axios from 'axios'

import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'
import LinearProgress from '@material-ui/core/LinearProgress';


function ProfileUpdater() {

    const[profileImage, setProfileImage]=useState("https://static.thenounproject.com/png/2033849-200.png")
    const[isShowProgress , setShowProgress]=useState(false)
    const[imgfile , setImgfile]=useState(null)
    const[uploadpercentage ,  setUploadPercentage]=useState(0)
    const[success, setSuccess]=useState(false)

    const imageHandler = (e) =>{


        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = ()=>{
            setProfileImage (reader.result)
        }
        var data = new FormData()
        data.append('filename', e.target.files[0].name)
        data.append('file', e.target.files[0])
        setImgfile(data)
    }
 

    const submitHandller = ()=>{
   
      setShowProgress(true)

    axios.post('/api/updateprofileimg' , imgfile , {
        headers: {
            'Content-Type': 'multipart/form-data'
          }, onUploadProgress: progressEvent => {
            setUploadPercentage(
              parseInt(
                Math.round(progressEvent.loaded / progressEvent.total *100)
              )
            )}
    }).then((data)=>{
         setSuccess(data)
    })
   
    
    }
  
  
    return (
        <div className="profileupdater__container">

           <img className="profileupdater__image" src={profileImage} alt="avatar"></img>

            <label className="profileupdater__upload__btn" >
               <input  type="file" accept="image/*" onChange={imageHandler}></input>
                   <div className="profileupdater__input_container">
                   <CloudUploadIcon className="icon" fontSize="large" titleAccess="upload Image"/>
                   <p className="profileupdater__upload_label">Select Image</p>
                   </div>
               </label>
               <Button className="profileupdater__submit-btn" variant="outlined" onClick={submitHandller} endIcon={<SendIcon />}> {success ? 'Uploaded' : 'upload'} </Button>
                
               {isShowProgress && <div>
               <LinearProgress className="profileupdater__progress" variant="determinate" value={uploadpercentage} />
               </div>}
        </div>
    )
}

export default ProfileUpdater

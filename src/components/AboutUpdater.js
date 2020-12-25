import React, { useState } from 'react'
import './AboutUpdater.css'

import Axios from 'axios'

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'

function AboutUpdater() {

    const[certificates , setCertificates]=useState([])
    const[certificateimgs , setCertificateImgs]=useState([])
    const[savedInDB , setSavedINDB]=useState(false)

    const imageHandler = (e) =>{

        const totalImages = e.target.files
        setCertificateImgs(totalImages)
        for(let i=0; i<totalImages.length; i++){
            const reader = new FileReader();
            reader.readAsDataURL(totalImages[i])
            reader.onload = ()=>{
            setCertificates((d) =>  [...d ,reader.result])
        }
        }
    }
  
    const submitHandller = async()=>{
 
        let data = new FormData()

        for(let i=0; i< certificateimgs.length; i++){
            data.append('filename', certificateimgs[i].name)
            data.append([i].toString(), certificateimgs[i])
            console.log(i)
        }
           
     await Axios.post('/api/certificatesupdate' , data, {
        headers:{
            'Content-Type': 'multipart/form-data',
        }
      }).then((res)=>{
        setSavedINDB(res.data)
      })
      
    }

    return (
            <div className="aboutupdater__container">

               <label className="profileupdater__upload__btn" >
               <input  type="file" accept="image/*" multiple onChange={imageHandler}></input>
              <div className="profileupdater__input_container">
              <AddAPhotoIcon className="icon" fontSize="large" titleAccess="upload Image"/>
              <p className="profileupdater__upload_label">Upload certificates you want to show up</p>
              </div>
              </label>
              <h5 className="portfolioupdater__title">Preview</h5>
              <div className="aboutupdater__img_container">
              {certificates.map((img , index)=>{
                  return <img key={index} className="aboutupdater__img-gallery" src={img}></img>
              })}
               </div>
              <Button className="aboutupdater__btn" variant="contained"  onClick={submitHandller}  endIcon={<CloudUploadIcon />}>Upload</Button>
              {savedInDB && <Alert severity={'success'}>Certificates Updated Successfully</Alert>}
            
        </div>
    )
}

export default AboutUpdater

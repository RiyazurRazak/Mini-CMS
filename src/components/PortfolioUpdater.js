import React, { useState } from 'react'
import './PortfolioUpdater.css'
import axios from 'axios'

import TextField from '@material-ui/core/TextField'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import TextEditor from './GlobalComponents/TextEditor'

function PortfolioUpdater() {

    const[projectTitleValue ,setProjectTitleValue]=useState("")
    const[featureContent , setFeatureContent]=useState("")
    const[images , setImages]=useState([])
    const[isImagePrev , setIsImagePrev]=useState(false)
    const[rawImg , setRawImg]=useState([])
    const[content, setContent]=useState("")
    const[isUpdated , setIsUpdated]=useState(false)
   

    const imageHandler = (e) =>{
        
      
        const totalImages = e.target.files
        setRawImg(totalImages)
         console.log(totalImages)
        for(let i=0; i<totalImages.length; i++){
            const reader = new FileReader();
            reader.readAsDataURL(totalImages[i])
            reader.onload = ()=>{
            setImages((d) =>  [...d ,reader.result])
        }
        }
        setIsImagePrev(true)       
       
    }

    const value= (data)=>{
        setContent(data)
    }

    const submitHandller = async()=>{

        let data = new FormData()
        data.append('title', projectTitleValue)
        data.append('featurecontent' , featureContent)
        data.append('content', content)

        for(let i=0; i< rawImg.length; i++){
            data.append('filename', rawImg[i].name)
            data.append([i].toString(), rawImg[i])
        }

           
     await axios.post('/api/portfolioupdate' , data, {
        headers:{
            'Content-Type': 'multipart/form-data',
        }
      }).then((res)=>{
        setIsUpdated(res.data)
      })
      }
    
   
    


    return (
        <div className="portfolioupdater__container">
            
            <div>
            <h3 className="portfolioupdater__title">Project Name</h3>
            <TextField
              id="portfolio-project-title"
              label="Project Title"
              multiline
              fullWidth
              type="text"
              helperText="Project Title"
              rowsMax={6}
              value={projectTitleValue}
              onChange={(e) => setProjectTitleValue(e.target.value)}
            /> 
            </div>
            <div>
            <h3 className="portfolioupdater__title">Project Features</h3>
            <TextField
              id="portfolio-project-featurecontent"
              label="Project Features"
              multiline
              fullWidth
              type="text"
              helperText="Max 200 Words"
              rowsMax={6}
              value={featureContent}
              onChange={(e) => setFeatureContent(e.target.value)}
            /> 
            </div>
            <div>
                <h3 className="portfolioupdater__title">About The Project</h3>
                <TextEditor submit={value} />
            </div>
            <div> 
               <label className="profileupdater__upload__btn" >
               <input  type="file" accept="image/*" multiple onChange={imageHandler}></input>
              <div className="profileupdater__input_container">
              <AddAPhotoIcon className="icon" fontSize="large" titleAccess="upload Image"/>
              <p className="profileupdater__upload_label">Upload Many Images You want to show in portfolio</p>
              </div>
              </label>
              <h5 className="portfolioupdater__title">Preview</h5>
              <div className="portfolioupdater__img_container">
              {images.map((img , index)=>{
                  return <img key={index} className="portfolioupdater__img-gallery" src={img}></img>
              })}
              </div>
            {isImagePrev && <Button className="portfolioupdater__btn" variant="outlined" color="secondary" onClick={submitHandller}  endIcon={<CloudUploadIcon />}>Upload</Button>}
               
            </div>
            {isUpdated && <Alert severity={"success"}> Updated Successfully </Alert>}
           
            
        </div>
    )
}

export default PortfolioUpdater

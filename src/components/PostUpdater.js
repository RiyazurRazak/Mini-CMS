import React, { useState } from 'react'
import './PostUpdater.css'

import axios from 'axios'

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker , MuiPickersUtilsProvider } from "@material-ui/pickers";

import TextField from '@material-ui/core/TextField'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'

import TextEditor from './GlobalComponents/TextEditor'




function PostUpdater() {

    const[postTitleValue , setPostTitleValue]=useState('')
    const[selectedDate ,setSelectedDate]=useState(new Date())
    const[featureImage , setFeatureImage]=useState("https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png")
    const[contentBody , setContent]=useState("")
    const[imageFile , setImageFile]=useState("")
    const[isDbUpdated , setDbUpdated]=useState(false)

    const imageHandler = (e) =>{

      setImageFile(e.target.files[0])
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = ()=>{
            setFeatureImage (reader.result)
        } 
      }


    const getValue = (data) =>{
       setContent(data)
    }

    
    const submitHandller = async()=>{

      let data = new FormData()
      data.append('filename', imageFile.name)
      data.append('file', imageFile)
      data.append('title', postTitleValue)
      data.append('date', selectedDate.toLocaleDateString('pt-PT') )
      data.append('content',contentBody  )
     
     await axios.post('/api/postupdate' , data, {
        headers:{
            'Content-Type': 'multipart/form-data', 
        }
      }).then((d)=>{
        setDbUpdated(d)
      })}
     

    return (
        <div className="postupdater__container">
            <div>
            <h3 className="postupdater__title">Post Title</h3>
            <TextField
              id="post-title"
              label="Title"
              multiline
              fullWidth
              type="text"
              helperText="Post Title"
              rowsMax={6}
              value={postTitleValue}
              onChange={(e) => setPostTitleValue(e.target.value)}
            /> 
            </div>
            <div>
            <h3 className="postupdater__title">Post Date</h3>    
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              format="dd/MM/yyyy"
              label="Date of published"
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
             />
            </MuiPickersUtilsProvider>
            </div>
            <div>
                <h3 className="postupdater__title">Feature Image</h3>
                <div> 
               
               <label className="profileupdater__upload__btn" >
               <input  type="file" accept="image/*" onChange={imageHandler}></input>
              <div className="profileupdater__input_container">
              <AddAPhotoIcon className="icon" fontSize="large" titleAccess="upload Image"/>
              <p className="profileupdater__upload_label">Upload Feature Image</p>
              </div>
              </label>
              <h5 className="postupdater__title">Preview</h5>
              <img className="profileupdater__image" src={featureImage} alt=""></img>
                </div>
                <hr />
              
             </div>
             <div>
                 <h3 className="postupdater__title">Content Editor</h3>
                 <TextEditor 
                 submit={getValue}/>
             </div>
             <Button className="portfolioupdater__btn" variant="outlined" color="secondary" onClick={submitHandller}  >Upload</Button>

             {isDbUpdated && <Alert className="postUpdater__alert" severity="success">Post Updated Successfully — check it out!</Alert>}


        </div>
    )
}

export default PostUpdater

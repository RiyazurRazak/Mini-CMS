import React, {useState} from 'react'
import './TestimonialUpdater.css'

import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import Axios from 'axios'

function TestimonialUpdater() {

    const[profileImage, setProfileImage]=useState("https://static.thenounproject.com/png/2033849-200.png")
    const[testimonialValue , setTestimonialValue]=useState("")
    const[testimonialNameValue , setTestimonialNameValue]=useState("")
    const[imgFile , setImgFile]=useState([])
    const[isSavedInDB , setIsSavedInDB]=useState(false)
  
    console.log(testimonialNameValue)
   
    const imageHandler = (e) =>{
      
        const reader = new FileReader();
        setImgFile(e.target.files[0])
        reader.readAsDataURL(e.target.files[0])
        reader.onload = ()=>{
            setProfileImage (reader.result)
        }
    }
 

    const submitHandller = async()=>{
        let data = new FormData()
        data.append('file', imgFile)
        data.append('name', testimonialNameValue)
        data.append('content' , testimonialValue)
     
     

   await  Axios.post('/api/testimonialupdate' , data , {
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    }).then((res)=>{
         setIsSavedInDB(res.data)
    })
   
    
    }
    return (
        <div className="testimonialupdater__container">

            <div>
            <img className="testimonialupdater__image" src={profileImage} alt="avatar"></img>
            <label className="testimonialupdater__upload__btn" >
               <input  type="file" accept="image/*" onChange={imageHandler}></input>
                   <div className="profileupdater__input_container">
                   <CloudUploadIcon className="icon" fontSize="large" titleAccess="upload Image"/>
                   <p className="testimonialupdater__upload_label">Select Image</p>
                   </div>
               </label>
               </div>

               <div>
               <h3 className="testimonialupdater__heading">Name</h3>
            <TextField
              label="Name"
              multiline
              fullWidth
              type="text"
              helperText="Testimonial Name"
              rowsMax={8}
              value={testimonialNameValue}
              onChange={(e) => setTestimonialNameValue(e.target.value)}
            /> 

               <h3 className="testimonialupdater__heading">Testimonial</h3>
            <TextField
              label="Testimonial"
              multiline
              fullWidth
              type="text"
              helperText="Testimonial"
              rowsMax={8}
              value={testimonialValue}
              onChange={(e) => setTestimonialValue(e.target.value)}
            />
               </div>
               <Button className="profileupdater__submit-btn" variant="outlined" onClick={submitHandller} endIcon={<SendIcon />}>upload</Button>
                {isSavedInDB && <Alert severity={'success'}> Updated Successfully</Alert>}
           
            
        </div>
    )
}

export default TestimonialUpdater

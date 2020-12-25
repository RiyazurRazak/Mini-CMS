import React, { useState } from 'react'
import './CommentForm.css'

import axios from 'axios'


import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'

function CommentForm(props) {

    const[content , setContent] = useState("")
    const[name , setName]=useState("")
    const[email , setEmail]=useState("")

 

    const submitHandller = async()=>{

      await axios.post(`/api/${props.type}commentupdate` , {
            postTitle:props.title,
            name:name,
            email:email,
            comment:content
        } , {
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res)=> {
            props.refresh()
        })

    }

 


    return (
        <div>
             <hr />
            <h3 className="comment_heading">Join the discussion</h3>

            <div className="comment_textarea_container">
            <textarea className="comment_textrea" rows="8" cols="40" onChange={(e)=> setContent(e.target.value)} value={content} required placeholder="Enter Your Thoughts..."></textarea>
            </div>
            <div className="uk-margin comment__name_container">
           <div className="uk-inline">
            <span className="uk-form-icon" uk-icon="icon: user"></span>
            <input className="uk-input comment_name" required type="text" onChange={(e)=> setName(e.target.value)} value={name} placeholder="Your Name" name="name"></input>
            </div>
            <div className="uk-margin comment__name_container"></div>
            <div className="uk-inline">
            <span className="uk-form-icon" uk-icon="icon: mail"></span>
            <input className="uk-input comment_name" required type="email" placeholder="e-mail" value={email} onChange={(e)=> setEmail(e.target.value)} name="e-mail"></input>
            </div>
            </div>
            <div className="comment__btn_container">
            <Button className="comment__btn" variant="outlined" color="secondary" onClick={submitHandller} endIcon={<SendIcon />}>Post </Button>
            </div>
         
            <hr />
           
        </div>
    )
}

export default CommentForm

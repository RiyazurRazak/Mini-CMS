import React, { useState,useEffect } from 'react'
import './Login.css'


import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { Redirect } from 'react-router-dom'




function Login(props) {
    
    
    const[userName , setUserName]=useState("")
    const[password , setPassword] = useState("")
    const[passType , setPassType]=useState("password")


    

    const passVisibilityHandler = ()=>{
        if(passType === "password"){
            setPassType("text")
        }
        else{
            setPassType("password")
        }
    }

    const loginHandller = ()=>{
        axios.post('/api/login' , {

        username: userName,
        password : password

        } ,   
          {
            withCredentials: true
          },{
              header:{
            'Access-Control-Allow-Credentials': 'true',
              }
          }
        ).then((res)=>{
              localStorage.setItem("token" , res.data.accessToken)
              window.location.reload()
          }  )
    }



    return (
      

        <div className="login__container">
              {(props.isAuthed) ? <Redirect to={'/dashboard'} /> :
              <div>
              <label className="login__input_label" htmlFor="username">username</label>
              <div className="uk-margin">
               <div className="uk-inline">
               <span className="uk-form-icon" uk-icon="icon: user"></span>
               <input id="username" onChange={(e)=> setUserName(e.target.value)} className="uk-input login__input" type="text" required name="username"></input>
               </div>
             </div>
             <label className="login__input_label" htmlFor="password">Password</label>
             <div className="uk-margin">
              <div className="uk-inline">
              <a className="uk-form-icon uk-form-icon-flip"> <IconButton onClick={passVisibilityHandler} >{passType ==="password" ?<VisibilityIcon className="login__icon"/> : <VisibilityOffIcon className="login__icon"/>}</IconButton></a> 
              <input id="password" onChange={(e)=> setPassword(e.target.value)} className="uk-input login__input" type={passType} required name="password"></input>
              </div>
             </div>
             <Button className="login__submit_btn" variant="contained" onClick={loginHandller}>Login</Button>
             </div>}
        </div>
    )
}

export default Login

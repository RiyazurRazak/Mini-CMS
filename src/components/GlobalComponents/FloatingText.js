import React, { useState, useEffect } from 'react'
import './FloatingText.css'



const FloatingText = () =>{

    const[isShow , setIsShow]=useState(false)

    useEffect(()=>{
          window.onscroll = ()=>{
        
      if (document.body.scrollTop > 1090 || document.documentElement.scrollTop > 1090) {
       setIsShow(true)
      }
      else{
        setIsShow(false)
      }
    }
    },[])
 
    const scrollHandller = () => {
        scroll({
            top:0,
            behavior:'smooth'
        })
    }

    return (
        <div>
        {isShow &&
        <div className="floating-container  ">
         <p className="floating-text" onClick={scrollHandller}> Scroll up -- </p>
        </div>}
     

    </div>)
}

export default FloatingText;
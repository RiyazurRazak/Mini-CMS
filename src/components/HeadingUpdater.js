import React, { useState , useEffect } from 'react'
import './HeadingUpdater.css'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import Axios from 'axios'

function HeadingUpdater() {

    const[aboutMeValue, setAboutMeValue]=useState("")
    const[topSkillsValue, setTopSkillsValue]=useState("")
    const[blogValue, setBlogValue]=useState("")
    const[portfolioValue, setPortfolioValue]=useState("")
    const[testimonialValue, setTestimonialValue]=useState("")
    const[isdatasavedindb , setDataSavedindb]=useState(false)

    useEffect(()=>{
        getHeadings()
    },[])

    const getHeadings = async()=>{
      await Axios.get("/api/homeheading").then((res)=>{
          res.data.map((data, index)=>{
            if(data.headingType == "about")
            setAboutMeValue(data.content)
            if(data.headingType == "skill")
            setTopSkillsValue(data.content)
            if(data.headingType == "blog")
            setBlogValue(data.content)
            if(data.headingType == "portfolio")
            setPortfolioValue(data.content)
            if(data.headingType == "testimonial")
            setTestimonialValue(data.content)
          })
        })
    }


    const submitHandller = async()=>{
     await Axios.post("/api/homeheadingupdate" ,    {about: aboutMeValue , skill: topSkillsValue , blog: blogValue, portfolio:portfolioValue , testimonial: testimonialValue} , {
        headers:{
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res.data)
       setDataSavedindb(true)
      })
     .catch((error) => {
      console.error('Error:', error);})
    
    }
   
    return (
        <div>
        <div className="headingupdater__form_container">
       
       
           <h3 className="headingupdater_title">About Me</h3>    
           <TextField
              id="about-me-heading"
              name="aboutmeheading"
              label="About Me"
              type="text"
              multiline
              fullWidth
              helperText="Text whatever you want to show in home->about-me->heading"
              rowsMax={6}
              value={aboutMeValue}
              onChange={(e) => setAboutMeValue(e.target.value)}
            />
            
            <h3 className="headingupdater_title">Top Skills</h3>
            <TextField
              id="top-skills-heading"
              label="Top Skills"
              multiline
              fullWidth
              type="text"
              helperText="Text whatever you want to show in home->top-skills->heading"
              rowsMax={6}
              value={topSkillsValue}
              onChange={(e) => setTopSkillsValue(e.target.value)}
            /> 
              <h3 className="headingupdater_title">Blog</h3>
            <TextField
              id="blog-heading"
              label="Blog"
              multiline
              fullWidth
              type="text"
              helperText="Text whatever you want to show in home->blog->heading"
              rowsMax={6}
              value={blogValue}
              onChange={(e) => setBlogValue(e.target.value)}
            /> 
              <h3 className="headingupdater_title">Portfolio</h3>
            <TextField
              id="portfolio-heading"
              label="Portfolio"
              multiline
              fullWidth
              type="text"
              helperText="Text whatever you want to show in home->portfolio->heading"
              rowsMax={6}
              value={portfolioValue}
              onChange={(e) => setPortfolioValue(e.target.value)}
            /> 
              <h3 className="headingupdater_title">Testimonial</h3>
            <TextField
              id="testimonial-heading"
              label="Testimonial"
              multiline
              fullWidth
              type="text"
              helperText="Text whatever you want to show in home->testimonial->heading"
              rowsMax={6}
              value={testimonialValue}
              onChange={(e) => setTestimonialValue(e.target.value)}
            /> 

            <Button className="headingupdater__submit" variant="outlined"  onClick={submitHandller} endIcon={<SendIcon />}>Post </Button>
        </div>  
        <Snackbar open={isdatasavedindb} autoHideDuration={5000}>
          <Alert  severity="success">
            Updated Successfully!
            </Alert>
          </Snackbar>
        </div>
    )
}

export default HeadingUpdater

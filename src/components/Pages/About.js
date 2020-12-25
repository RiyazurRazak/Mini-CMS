import React, {useState , useEffect} from 'react'
import './About.css'

import Grid from '@material-ui/core/Grid'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import TimelineDot from '@material-ui/lab/TimelineDot'

import Axios from 'axios'
import { Helmet } from 'react-helmet'


import Navbar from '../GlobalComponents/Navbar'
import Heading from '../GlobalComponents/Heading'
import Image from '../GlobalComponents/Image'
import Testimonial from '../GlobalComponents/Testimonial'
import FloatingText from '../GlobalComponents/FloatingText'
import Footer from '../GlobalComponents/Footer'

function About() {

  

    const Skills = ["HTML/CSS" , "ADOBE XD", "Figma" , "Venilla JavaScript", "React JS ,Redux" , "EXPRESS, MongoDB" ,"React Native" ]

    const[certificates , setCertificates]=useState([])

    useEffect(()=>{
        getCertigicates()
    },[])

    const getCertigicates = async()=>{
        await Axios.get('/api/certificates').then((res)=>setCertificates(res.data))
    }


    return (
        <div>
            <Helmet>
                <title>About ME</title>
            </Helmet>

           <div className="page__nav_container" >
            <Navbar />
           </div>
           <div className="about__container">
             <Grid container spacing={0}>
             <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Image />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className="home__grid_right">
         <div >
            <h2 className="about__heading">I'm EmillA, A Full Stack Web Developer <span className="about__heading_span">[MERN]</span></h2>
            <p className="about__intro">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
         </div>
        </Grid>
    </Grid>
    </div>

    <div className="about__timeline">
        <Heading 
        title="MY Technical Skills" />
    <Timeline align="alternate">
        {Skills.map((skill , index)=>{
            return(
                <TimelineItem key={index}>
                <TimelineOppositeContent>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot>
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <h3 className="about__timeline_skill">{skill}</h3> 
                </TimelineContent>
              </TimelineItem> )})}
     
    </Timeline>
    </div>

    <Heading 
        title="Certificates" 
    />
    
      
    <div className="uk-position-relative uk-visible-toggle uk-light about__certificate_container" tabIndex="-1" data-uk-slideshow="animation: scale">

    <ul className="uk-slideshow-items">

        {certificates.map((certificate , index)=>{
           return(
            <li key={index}>
            <img src={certificate.certificate} alt="certificate" data-uk-cover></img>
            </li>
           )
        })}
        
   
   
    </ul>

    <a className="uk-position-center-left uk-position-small uk-hidden-hover" href="#" data-uk-slidenav-previous data-uk-slideshow-item="previous"></a>
    <a className="uk-position-center-right uk-position-small uk-hidden-hover" href="#" data-uk-slidenav-next data-uk-slideshow-item="next"></a>

    </div>
  


       
    <Heading 
        title="TesTimonial" />
    <Testimonial />

    <FloatingText />

    <Footer />
     </div>
)}

export default About

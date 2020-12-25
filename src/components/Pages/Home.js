import React, { useEffect, useState } from 'react'
import './Home.css'
import { Helmet } from 'react-helmet'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Navbar from '../GlobalComponents/Navbar'
import Heading from '../GlobalComponents/Heading'
import Image from '../GlobalComponents/Image'
import FlipCard from '../FlipCard'
import Slider from '../Slider'
import Blog from '../GlobalComponents/Blog'
import Testimonial from '../GlobalComponents/Testimonial'
import FloatingText from '../GlobalComponents/FloatingText'
import Footer from '../GlobalComponents/Footer'
import Axios from 'axios'







const Home = ()=>{

    const [posts , setPosts] = useState([])
    const[heading , setHeading]=useState([])
  
   
   
 useEffect(() =>{
     getHenadings()
     getNewPosts()

 },[])


 const getHenadings = async()=>{
     await Axios.get('/api/homeheading').then((res)=>setHeading(res.data))
 }
 const getNewPosts = async()=>{
     await Axios.get('/api/post').then((res)=>setPosts(res.data.slice(0 ,5)))
 }

 



return(
    <>
      <Helmet>
           <title>Home</title>
           <meta name="keywords" content="blog , blogging , react js, frelancing projects"></meta>
           <meta name="description" content="mini-cms website which has a good ui design build in reactjs and nodejs"></meta>
          </Helmet>
    
    <Navbar />

    <div className="home__header_container">
    <div className="home__header_image"></div>
     <div  className="home__header_center_text">I'm EmillA <br /> Welcome To my Personal websiTe</div>
     <div className="home__header_bottom_text"><a className="home__scroll" href="#about"> <i className="far fa-hand-point-down"></i> Scroll Down</a></div>
    </div>

    <div id="about">
        { heading.map((obj , index)=>{
            if(obj.headingType === 'about'){
                return(
                    <Heading 
                     key={index}
                     title={"About Me"}
                     content={obj.content}
                     counter={"01"}/> )}
                     })}
    </div>
    
       
    <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className="home__image_div">
            <Image />
            </div>
         
          
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className="home__grid_right">
        <div data-uk-scrollspy="cls: uk-animation-slide-right; delay: 300; repeat: true">
            <div className="home__about_text_container">
                  <h1 className="text_container_title">I'm Lorem Ipsum</h1>
                  <h6 className="text_container_content">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</h6>
                  <ul className="uk-list uk-list-hyphen about_text_list">
                   <li>HTML 5 / CSS 3</li>
                   <li>JavaScript</li>
                   <li>React Js</li>
                   <li>Figma</li>
                   <li>Adobe XD</li>
                  </ul>
                  <Button variant="outlined" color="default" className="text_container_btn">My Resume</Button>
            </div>
            </div>
        </Grid>
    </Grid>

    
    { heading.map((obj , index)=>{
            if(obj.headingType === 'skill'){
                return(
                    <Heading 
                     key={index}
                     title={"top - Skills"}
                     content={obj.content}
                     counter={"02"}/> )}
                     })}
    
    <div className="home__flip_cards">
    <FlipCard 
    img={"https://images.unsplash.com/photo-1581521778197-f813ac8c16f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"}
    title={"UI / UX Designer"}
    content={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
    />
    <FlipCard 
    img={"https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"}
    title={"Web && App Developer"}
    content={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
    />
    <FlipCard 
    img={"https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"}
    title={"Python Developer"}
    content={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}/>
    </div>

    { heading.map((obj , index)=>{
            if(obj.headingType === 'blog'){
                return(
                    <Heading 
                     key={index}
                     title={"Blog"}
                     content={obj.content}
                     counter={"03"}/> )}
                     })}

    <section className="home__blog_container">
    {posts.map((post , index) =>{
        return(
            <Blog 
            key={index}
            title={post.title}
            img={post.featureimg}
            content={post.content.slice(0 , 200)}
            />
        )
    })}
  </section>


  { heading.map((obj , index)=>{
            if(obj.headingType === 'portfolio'){
                return(
                    <Heading 
                     key={index}
                     title={"portfolio"}
                     content={obj.content}
                     counter={"04"}/> )}
                     })}
   
    <Slider />

    { heading.map((obj , index)=>{
            if(obj.headingType === 'testimonial'){
                return(
                    <Heading 
                     key={index}
                     title={"Testimonial"}
                     content={obj.content}
                     counter={"05"}/> )}
                     })}

    <Testimonial />

    <FloatingText />

    <Footer />
   
    </>)}

export default Home;
import React, { useState , useEffect } from 'react'
import './PortfolioPage.css'
import { Helmet } from 'react-helmet'

import Axios from 'axios'

import Navbar from '../GlobalComponents/Navbar'
import Footer from '../GlobalComponents/Footer'
import FloatingText from '../GlobalComponents/FloatingText'
import {Link} from 'react-router-dom'
import Loader from '../GlobalComponents/Loader'





const PortfolioPage = () => {



  const[projects , setProjects]=useState([])
  const[isLoading , setIsLoading] = useState(false)

  useEffect(()=>{
    getPortfolios()
  },[])

  const getPortfolios = async()=>{
    setIsLoading(true)
    await Axios.get('/api/portfolio').then((res)=> {
      setProjects(res.data)
      setIsLoading(false)
    })
  }



    return (
        <>
          <Helmet>
           <title>Home</title>
           <meta name="keywords" content="blog , blogging , react js, frelancing projects"></meta>
           <meta name="description" content="mini-cms website which has a good ui design build in reactjs and nodejs"></meta>
          </Helmet>
          
         <div className="page__nav_container">
          <Navbar />
         </div>
          
         
        
         <div className=" uk-grid-small  uk-child-width-1-2 uk-child-width-1-4@s uk-child-width-1-6@m portfolio__gallery" data-uk-grid="masonry:true; parallax: 500">
            {projects.map((project , index) =>{
              return (
                <Link key={index} className="blog__link" to={`/portfolio-single/${project.title}`}><img className="portfolio__gallery_img" src={project.featureimg} alt={project.title} ></img></Link>
              )})}
         </div>  
           

         <FloatingText />
         <Footer />

         <Loader isLoad={isLoading} />
    </>)

} 

export default PortfolioPage;
import React, { useEffect, useState } from "react"
import './PortfolioSingle.css'
import {useParams} from 'react-router-dom'
import Navbar from '../GlobalComponents/Navbar'
import Heading from '../GlobalComponents/Heading'
import Footer from '../GlobalComponents/Footer'
import FloatingText from '../GlobalComponents/FloatingText'
import CommentForm from '../GlobalComponents/CommentForm'
import Comment from '../GlobalComponents/Comment'
import Axios from "axios"
import Loader from "../GlobalComponents/Loader"
import { Helmet } from 'react-helmet'




const PortfolioSingle = () =>{

    let { slug } = useParams()

    const [node,setNode]=useState()
    const[isLoading , setIsLoading] = useState(false)
    const[singleProject , SetSingleProject]=useState({featureimg:"", featurecontent:"",imagecollection:[], title:"",comments:[],content:""})


    const portfolioContent = React.useCallback(dom =>{
      if (dom !== null) {
          setNode(dom)
        }
      }, []);

    useEffect(()=>{
       getPortfolioContent()
    },[])

    const getPortfolioContent = async()=>{
      setIsLoading(true)
      await Axios.get(`/api/single-portfolio?title=${slug}`).then((res)=> {
        SetSingleProject(res.data)
        setIsLoading(false)
      })
    }

    const reloadComments = ()=>{
      getPortfolioContent()
    }

    if(node != undefined)
    node.innerHTML = singleProject.content

   


    return (
        <>
          <Helmet>
           <title>{singleProject.title}</title>
           <meta name="keywords" content="blog , blogging , react js, frelancing projects"></meta>
           <meta name="description" content={singleProject.featurecontent}></meta>
          </Helmet>

    <div className="page__nav_container">
     <Navbar />
    </div>
    <div>

    <div className="uk-position-relative uk-visible-toggle uk-light portfoliosingle__slider" tabIndex="-1" data-uk-slideshow="min-height: 300; max-height: 600; animation: push; autoplay : true; autoplay-interval: 3000">

     <ul className="uk-slideshow-items">
   
     <li>
    
     <div data-uk-lightbox="animation: fade">
      <a href ={singleProject.featureimg}>
      <img src={singleProject.featureimg} alt="display-images" data-uk-cover ></img>
      <div className="uk-overlay uk-overlay-primary uk-position-right uk-text-center uk-transition-slide-right uk-width-medium">
        <h3 className="uk-margin-remove">{singleProject.title}</h3>
        <p className="uk-margin-remove portfoliosingle__content">{singleProject.featurecontent.slice(0 , 200)}</p>
     </div>
     </a>
      </div>
    
    </li>
   
     {singleProject.imagecollection.map((img , index) => <li key={index}> <div uk-lightbox="animation: fade"> <a href={img}><img src={img} alt="display-images" data-uk-cover ></img></a></div></li>)}
       
    </ul>

<a className="uk-position-center-left uk-position-small uk-hidden-hover" href="#" data-uk-slidenav-previous data-uk-slideshow-item="previous"></a>
<a className="uk-position-center-right uk-position-small uk-hidden-hover" href="#" data-uk-slidenav-next data-uk-slideshow-item="next"></a>

</div>



    <Heading title={"About the project"} />

    <h1 className="portfoliosingle__title">{singleProject.title}</h1>
    <div ref={portfolioContent} className="portfoliosingle__para"></div>

    <FloatingText />

    <CommentForm 
     type={'portfolio'}
     title={slug}
     refresh={reloadComments}
    />
    <h3 className="comment_heading">Comments</h3>
     <Comment 
      comments={singleProject.comments}
     />

   <Footer />  
   </div>

   <Loader isLoad={isLoading} />

    </>)
}



export default PortfolioSingle;
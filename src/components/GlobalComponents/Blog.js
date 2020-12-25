import React from 'react'
import './Blog.css'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'




const Blog = (props)=>{


    return(
        <>
        
      
           <article className="blog__container">
               <img className="blog__image_container" src={props.img} alt="image"></img>
               <div className="blog__content_container">
                   <h1  data-uk-parallax="opacity: 0,1,1; y: -100,0,0; x: 100,100,0; scale: 2,1,1; viewport: 0.5;" className="blog__content_title">{props.title}</h1>
                   <div className="blog__content_content">{props.content.replace( /(<([^>]+)>)/ig, '')}</div>
                   <div><Link className="blog__link" to={`/blog/${props.title}`}><Button className="blog__btn" variant="outlined" color="secondary" >Read more</Button></Link></div>
               </div>
           </article>
      
        
   




    </>)
}

export default Blog;
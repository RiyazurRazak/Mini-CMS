import React from 'react'
import './Heading.css'




const Heading = (props)=>{

return (
    <div className="heading__container">
    <div id={props.link}>
     <hr className="heading__top_divider"></hr>
     <h2 className="heading__title">-- {props.title}</h2>
     <p className="heading__content">{props.content}</p>
     <hr className="heading__divider"></hr>
     </div>
     <div>
     <p data-uk-parallax="opacity: 0,1; y: 100,0; scale: 0.5,1; viewport: 0.5;"  className="heading__counter">{props.counter}</p>
     </div>
    </div>)
}


export default Heading;
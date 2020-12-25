import React from 'react'
import "./FlipCard.css"


const FlipCard = (props) =>{

    return(
        <>
         <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img className="flip-card-image" src={props.img} alt="skills-bg"></img>
            </div>
            <div className="flip-card-back">
             <h1 className="flip-card-heading">{props.title}</h1>
             <p className="flip-card-content">{props.content}</p>
           </div>
          </div>
        </div>

        </>)
}

export default FlipCard;
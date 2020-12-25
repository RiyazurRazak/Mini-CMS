import React, { useEffect, useState } from "react"
import './Testimonial.css'
import Axios from "axios"


const Testimonial = () =>{

    const[testimonials , setTestimonials]=useState([])

    useEffect(()=>{
        getTestimonials()
    },[])

    const getTestimonials = async()=>{
        await Axios.get('/api/testimonial').then((res)=> setTestimonials(res.data))
    }


    return (
        <section className="testimonial__section">

            {testimonials.map((testimonial , index)=>{
                return(

                <div key={index} className="testimonial__container">
                    <img className="testimonial__avatar" src={testimonial.avatar} alt="avatar"></img>
                     <h2 className="testimonial__name">{testimonial.name}</h2>
                    <p className="testimonial__content">{testimonial.content}</p>
                </div>
                )
            })}

    </section>)
}

export default Testimonial;
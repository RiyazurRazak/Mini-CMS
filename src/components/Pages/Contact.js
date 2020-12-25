import React from 'react'
import './Contact.css'
import { Helmet } from 'react-helmet'

import Navbar from '../GlobalComponents/Navbar'
import Heading from '../GlobalComponents/Heading'
import Footer from '../GlobalComponents/Footer'





const Contact = () =>{

  


    return (<>
    
         <Helmet>
           <title>Contact</title>
           <meta name="keywords" content="blog , blogging , react js, frelancing projects"></meta>
           <meta name="description" content="mini-cms website which has a good ui design build in reactjs and nodejs"></meta>
        </Helmet>
    <div className="page__nav_container">
    <Navbar />
    </div>
 
   

    <Heading 
        title={"Contact"}
        content={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the"}
        counter={"01"}
        link={"blog-top"} 
    />
    
             
              <form className="contact__form" action={""}>
              <fieldset className="uk-fieldset contact__input">

              <div className="uk-margin">
             <input className="uk-input name_input" type="text" placeholder="Your Name"></input>
              </div>

             <div className="uk-margin">
             <select className="uk-select select_input">
                <option>Hire me</option>
                <option>Join with Team</option>
                <option>Others</option>
            </select>
            </div>

            <div className="uk-margin">
            <textarea className="uk-textarea message_input" rows="5" placeholder="Your Message"></textarea>
            </div>
            <button className="btn_input" type="submit" value="submit">Submit</button>
            </fieldset>
</form>


   
   
  

    


    <Footer />

    </>)
}

export default Contact;
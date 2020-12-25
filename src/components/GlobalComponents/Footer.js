import React from 'react'
import './Footer.css'
import PhoneIcon from '@material-ui/icons/Phone';
import DraftsIcon from '@material-ui/icons/Drafts';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {Link} from 'react-router-dom'



const Footer = () =>{

    const year = new Date();

    return (
        <>
        <div className="footer">
         <section className="footer__container">
             <div className="footer__col-1">
                 <h3 className="footer__title">Don't be a stranger Just say heloo</h3>
             <i className="fab fa-facebook-f"></i>
             <i className="fab fa-instagram"></i>
             <i className="fab fa-dribbble"></i>
             <i className="fab fa-github"></i>
             <i className="fab fa-pinterest-p"></i>
             </div>
             <div className="footer__col-2">
             <h3 className="footer__title">Contact</h3>
              <span className="footer__contacts"><PhoneIcon /> Phone: +144 123 987 234 </span> 
              <span className="footer__contacts"> <DraftsIcon /> Mail: example@example.io</span>
              <span className="footer__contacts"><LocationOnIcon /> Address : Your Address</span>
             </div>
             <div className="footer__col-2">
                 <h3 className="footer__title">Quick Links</h3>
             <ul className="uk-list uk-list-hyphen">
                     <li><Link className="footer__links"  to={"/home"} >Home</Link></li>
                     <li><Link className="footer__links" to={"/portfolio"} >Portfolio</Link></li>
                     <li><Link className="footer__links"  to={"/blog"} >Blog</Link></li>
                     <li><Link className="footer__links" to={"/contact"} >Contact</Link></li>
                  </ul>   
             </div>
             </section>
             <div className="footer__credential">
                 <p className="footer__creater">Created by Riyazur Razak </p>
                 <p className="footer__copyright"> © {year.getFullYear()} All rights reserved</p>
             </div>
         </div>
        
         




    </>)
}


export default Footer;

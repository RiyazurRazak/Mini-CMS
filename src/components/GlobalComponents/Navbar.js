import React, { useState } from 'react';
import './Navbar.css'
import MenuRoundedIcon from '@material-ui/icons/MenuRounded'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import BookIcon from '@material-ui/icons/Book';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import ContactsIcon from '@material-ui/icons/Contacts';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ReceiptIcon from '@material-ui/icons/Receipt';
import InfoIcon from '@material-ui/icons/Info';
import PersonIcon from '@material-ui/icons/Person';
import {Link} from 'react-router-dom'




const Navbar =() =>{
  
    const[open , setOpen]=useState(false)
    const [Listopen, setListOpen]=useState(false)
    const drawerList =[{text: "Home", slug: "/home", ico: HomeRoundedIcon},{text: "PortFolio", slug: "/portfolio", ico: PermMediaIcon},
    {text: "Blog", slug:"/blog" ,ico: BookIcon},{text: "Contact", slug: "/contact" , ico: ContactsIcon}, ] 

    return(
    <>
          <div className="uk-position-relative navbar">
            <div className="uk-position-top">
              <nav className="uk-navbar-container uk-navbar-transparent" data-uk-navbar>
                <div className="uk-navbar-right nav__menu">
                   <ul className="uk-navbar-nav">
                     <li><Link to={"/home"} >Home</Link></li>
                     <li><Link to={"/portfolio"} >Portfolio</Link></li>
                     <li><Link to={"/blog"} >Blog</Link></li>
                     <li><Link to={"/contact"} >Contact</Link></li>
                   
                     <li>
                        <Link to={"/about"} >About</Link>
                        <div className="uk-navbar-dropdown">
                            <ul className="uk-nav uk-navbar-dropdown-nav">
                                <li><a href="#">Download CV</a></li>
                            </ul>
                        </div>
                     </li>
                     </ul>
                 </div>
              </nav>
            </div>
         </div>

           <div className="uk-position-relative">
            <div className="uk-position-top">
              <nav className="uk-navbar-container uk-navbar-transparent" data-uk-navbar>
                <div className="uk-navbar-left nav__menu nav__menu_icon" onClick={() => setOpen(true)}>
                   <MenuRoundedIcon color={"inherit"} fontSize={"inherit"}/>
                </div>
              </nav>
            </div>
           </div>

        <Drawer
           anchor={'left'}
           open={open}
           onClose={() =>setOpen(false)} 
        >
              <div className="nav__drawer">
                  {drawerList.map((list , index) =>{
                      return (
                    <List key={index}>
                      <Link to={list.slug} className="link">
                        <ListItem button>
                            <ListItemIcon>
                                <list.ico className="nav__drawer_icon"/>
                            </ListItemIcon>
                            <ListItemText className="nav__drawer_text"
                               primary={list.text}
                            />
                        </ListItem>
                        </Link>
                         <hr></hr>
                    </List>
                      )})}
                    <List>
                      <ListItem button onClick={() => setListOpen(!Listopen)}>
                          <ListItemIcon>
                              <InfoIcon className="nav__drawer_icon" />
                          </ListItemIcon>
                        <ListItemText primary="About" />
                        {Listopen ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                    <Collapse in={Listopen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                      <Link to={"/about"} className="link" >
                        <ListItem button className="nav-inner-list" >
                         <ListItemIcon>
                         <PersonIcon className="nav__drawer_icon"/>
                        </ListItemIcon>
                         <ListItemText primary="About Me"  />
                         </ListItem>
                         </Link>
                        </List>
                        <List component="div" disablePadding>
                        <ListItem button className="nav-inner-list" >
                         <ListItemIcon>
                         <ReceiptIcon className="nav__drawer_icon"/>
                        </ListItemIcon>
                         <ListItemText primary="Download CV"  />
                         </ListItem>
                        </List>
                    </Collapse>
                    </List>
                    <hr></hr>
                    </div>
        </Drawer>
        
           

 
    </>)}

export default Navbar;
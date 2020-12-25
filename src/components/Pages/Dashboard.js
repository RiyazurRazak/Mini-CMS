import React, { useState } from 'react'
import './Dashboard.css'


import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import { Helmet } from 'react-helmet'

import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import CreateIcon from '@material-ui/icons/Create'
import PostAddIcon from '@material-ui/icons/PostAdd'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import InfoIcon from '@material-ui/icons/Info'
import Skeleton from '@material-ui/lab/Skeleton'
import Button from '@material-ui/core/Button';

import ProfileUpdater from '../ProfileUpdater'
import HeadingUpdater from '../HeadingUpdater'
import PostUpdater from '../PostUpdater'
import PortfolioUpdater from '../PortfolioUpdater';
import AboutUpdater from '../AboutUpdater';
import TestimonialUpdater from '../TestimonialUpdater';


function Dashboard({loggedUser}) {

    const[selectedIndex , setSelectedIndex]=useState(null)

    const logoutHandller = ()=>{
      localStorage.clear("token")
      window.location.reload()
    }
      
    return (
        <div className="dashboard__list">
          <Helmet>
           <title>Dashboard</title>
           <meta name="keywords" content="blog , blogging , react js, frelancing projects"></meta>
           <meta name="description" content="mini-cms website which has a good ui design build in reactjs and nodejs"></meta>
          </Helmet>
            
            <Grid container spacing={0}>
             <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <div className="dashboard__list">
             <List>
             <Link to={"/home"} className="dashboard__link" >
               <ListItem
                 button
                 selected={selectedIndex === 0}
                 onClick={() => setSelectedIndex(0)}
       
                  >
                 <ListItemIcon>
                  <HomeTwoToneIcon className="dashboard__icon" />
                 </ListItemIcon>
                 <ListItemText primary="HomePage" className="dashboard__text" />
               </ListItem>
               </Link>
               <Divider className="dashboard__divider" />
               <Link to={"/dashboard/profileupdate"} className="dashboard__link">
               <ListItem
                 button
                 selected={selectedIndex === 1}
                 onClick={() => setSelectedIndex(1)}
                  >
                 <ListItemIcon>
                  <AccountCircleIcon className="dashboard__icon" />
                 </ListItemIcon>
                 <ListItemText primary="Profile Picture" className="dashboard__text" />
               </ListItem>
               </Link>
               <Divider className="dashboard__divider" />
               <Link to={"/dashboard/headingupdate"} className="dashboard__link">
               <ListItem
                 button
                 selected={selectedIndex === 2}
                 onClick={() => setSelectedIndex(2)}
                  >
                 <ListItemIcon>
                  <CreateIcon className="dashboard__icon" />
                 </ListItemIcon>
                 <ListItemText primary="Home Heading" className="dashboard__text" />
               </ListItem>
               </Link>
               <Divider className="dashboard__divider" />
               <Link to={"/dashboard/postupdate"} className="dashboard__link">
               <ListItem
                 button
                 selected={selectedIndex === 3}
                 onClick={() => setSelectedIndex(3)}
                  >
                 <ListItemIcon>
                  <PostAddIcon className="dashboard__icon" />
                 </ListItemIcon>
                 <ListItemText primary="Post" className="dashboard__text" />
               </ListItem>
               </Link>
               <Divider className="dashboard__divider" />
               <Link to={"/dashboard/portfolioupdate"} className="dashboard__link">
               <ListItem
                 button
                 selected={selectedIndex === 4}
                 onClick={() => setSelectedIndex(4)}
                  >
                 <ListItemIcon>
                  <PhotoLibraryIcon className="dashboard__icon" />
                 </ListItemIcon>
                 <ListItemText primary="Portfolio" className="dashboard__text" />
               </ListItem>
               </Link>
               <Divider className="dashboard__divider" />
               <Link to={"/dashboard/aboutupdate"} className="dashboard__link">
               <ListItem
                 button
                 selected={selectedIndex === 5}
                 onClick={() => setSelectedIndex(5)}
                  >
                 <ListItemIcon>
                  <InfoIcon className="dashboard__icon" />
                 </ListItemIcon>
                 <ListItemText primary="About Page" className="dashboard__text" />
               </ListItem>
               </Link>
               <Divider className="dashboard__divider" />
               <Link to={"/dashboard/testimonialupdate"} className="dashboard__link">
               <ListItem
                 button
                 selected={selectedIndex === 6}
                 onClick={() => setSelectedIndex(6)}
                  >
                 <ListItemIcon>
                  <InfoIcon className="dashboard__icon" />
                 </ListItemIcon>
                 <ListItemText primary="Testimonial" className="dashboard__text" />
               </ListItem>
               </Link>
             </List>
             </div>
          </Grid>
          <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
               <div className="dashboard__user_container">
                   <h6 className="dashboard__username">Welcome {loggedUser}</h6>
                   <Button className="dashboard__logoutBtn" onClick={logoutHandller}>Logout</Button>

                </div>

              <div>
                <Switch>
                  <Route path={"/dashboard"} exact><Skeleton height={800} /></Route>
                  <Route path={"/dashboard/profileupdate"} component={ProfileUpdater} />
                  <Route path={"/dashboard/headingupdate"} component={HeadingUpdater} />
                  <Route path={"/dashboard/postupdate"} component={PostUpdater} />
                  <Route path={"/dashboard/portfolioupdate"} component={PortfolioUpdater} />
                  <Route path={"/dashboard/aboutupdate"} component={AboutUpdater} />
                  <Route path={"/dashboard/testimonialupdate"} component={TestimonialUpdater} />
                </Switch>
              </div>

              <div className="dashboard__credential">
                <h6 className="dashboard__credentialName">By Riyazur Razak</h6>
              </div>

           
              

            
          </Grid>
                 
                 </Grid>

            
        </div>
    )
}

export default Dashboard

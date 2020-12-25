import React from 'react'
import {Redirect, Route} from 'react-router-dom';

function ProtectedRouter({component: Component, authed, userName, async, ...rest}) {
    return (

       <Route 
       {...rest}
       render={(props) => authed ?  <Component {...props} loggedUser={userName} />  : 
       <Redirect to ={{pathname : '/login' , state:{from:props.location}}} />} /> 
    )
}

export default ProtectedRouter

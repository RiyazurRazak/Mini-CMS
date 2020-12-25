import React ,{useState , useEffect}from 'react';
import './App.css';
import { Route, Switch} from 'react-router-dom'
import ProtectedRouter from './components/GlobalComponents/ProtectedRouter'
import Home from './components/Pages/Home'
import BlogPage from './components/Pages/BlogPage'
import Post from './components/Pages/Post'
import Portfolio from './components/Pages/PortfolioPage'
import PortfolioSingle from './components/Pages/PortfolioSingle'
import Contact from './components/Pages/Contact'
import About from './components/Pages/About'
import Login from './components/Pages/Login'
import Dashboard from './components/Pages/Dashboard'
import Axios from 'axios';

import ScrollToTop from './components/GlobalComponents/ScrollToTop'



function App() {

  const[islogin , setLogin] = useState(null)
  const[loggedUserName, setLoggedUserName]=useState(null)
  

  useEffect(() => {
    Axios.get('/api/isuserlogged' , {
      headers:{
        authorization: 'Bearer '+ localStorage.getItem("token")
      }
    }).then((res)=>{
      setLogin(res.data.isSigned)
      setLoggedUserName(res.data.loggedUser)
    })
  }, [])

 
 


  return (
    <div className="App">
       <ScrollToTop />

        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/blog" component={BlogPage} exact />
          <Route path="/blog/:slug" component={Post} exact />
          <Route path="/portfolio" component={Portfolio} exact />
          <Route path="/portfolio-single/:slug" component={PortfolioSingle} exact />
          <Route path="/contact" component={Contact} exact />
          <Route path="/about" component={About} exact />
          <Route path="/login" render={(props)=> <Login {...props} isAuthed={islogin} />} exact />
          <ProtectedRouter authed={islogin} userName={loggedUserName} path="/dashboard" component={Dashboard}  />
        </Switch>

    </div>
  );
}

export default App;

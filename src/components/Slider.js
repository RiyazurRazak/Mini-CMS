import React, {useState , useEffect} from 'react'
import './Slider.css'
import Fab from '@material-ui/core/Fab';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Axios from 'axios'
import {Link} from 'react-router-dom'




const Slider = () =>{

    const [portfolios , setPortfolios] = useState([])
   
    useEffect(()=>{
        getNewProjects()
    },[])

    const getNewProjects = async()=>{
        await Axios.get('/api/portfolio').then((res)=>setPortfolios(res.data.slice(0 ,5)))
    }

    return (
        <>
       <div className="uk-position-relative uk-visible-toggle uk-light slider__component" tabIndex="-1" data-uk-slider="sets: false;">

       <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@m">

           {portfolios.map((project , index) =>{
               return(
                <li key={index}>
                 <Link to={`/portfolio-single/${project.title}`} > <img  className = "slider__image" src={project.featureimg} alt={project.title}></img></Link>
                    <div className="uk-position-center uk-panel"></div>
                </li>
               )
           })}

  
    <li className="slider__action_container">
        <div className="slider__action_btn"><Fab aria-label="arrow" >
            <Link to={"/portfolio"} ><ArrowForwardIosIcon /></Link> 
        </Fab>
        <br />
        <br />
        Click to know more.....
        </div>
        <div className="uk-position-center uk-panel"></div>
    </li>
 
 
</ul>

<a  className="uk-position-center-left uk-position-small uk-hidden-hover" href="#" data-uk-slidenav-previous data-uk-slider-item="previous"></a>
<a className="uk-position-center-right uk-position-small uk-hidden-hover" href="#" data-uk-slidenav-next data-uk-slider-item="next"></a>

</div>

        </>)
}


export default Slider;
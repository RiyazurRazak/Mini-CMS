import React ,{useState , useEffect} from 'react'
import './Image.css'

import Skeleton from '@material-ui/lab/Skeleton'
import Axios from 'axios'

function Image() {

    const[image, setImage]=useState(null)

    useEffect(()=>{
        getImage()
    },[])

    const getImage = async()=>{
        await Axios.get('/api/profileimage').then((res)=> setImage(res.data))
    }

    return (
     
            
            <div className="home__about_img_container">
            <div  data-uk-scrollspy="cls: uk-animation-slide-left;delay: 300; repeat: true">
                {image ? <img className="home__about_image" src={image.uri} alt={image.name} loading="eager"></img> :
                <Skeleton width={'50%'} height={'60%'} /> }
               
            </div>
            </div>
        
    )
}

export default Image

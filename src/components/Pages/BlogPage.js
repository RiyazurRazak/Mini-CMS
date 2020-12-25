import React ,{useState , useEffect} from 'react'
import './BlogPage.css'

import Navbar from '../GlobalComponents/Navbar'
import Blog from '../GlobalComponents/Blog'
import Footer from '../GlobalComponents/Footer'
import Heading from '../GlobalComponents/Heading'
import FloatingText from '../GlobalComponents/FloatingText'
import Loader from '../GlobalComponents/Loader'


import Axios from 'axios'
import { Helmet } from 'react-helmet'







const BlogPage = () =>{

   

    const[posts , setPosts]=useState([])
    const[isLoading , setIsLoading] = useState(false)

  useEffect(()=>{
    getPosts()
  },[])

  const getPosts = async()=>{
    setIsLoading(true)
    await Axios.get('/api/post').then((res)=> {
      setPosts(res.data)
      setIsLoading(false)
    })
  }


    return(
        <>

        <Helmet>
           <title>Blogs</title>
           <meta name="keywords" content="blog , blogging , react js, frelancing projects"></meta>
           <meta name="description" content="mini-cms website which has a good ui design build in reactjs and nodejs"></meta>
        </Helmet>
       <div className="page__nav_container" >
       <Navbar />
       </div>
        

        <Heading title={"Blogs"} />

         <section className="blogpage__blog_container">
    
        {posts.map((post , index) =>{
            return(       
                <Blog 
                  key={index}
                  title={post.title}
                  img={post.featureimg}
                  content={post.content.slice(0 , 200)}
                />
            )
        })}

        </section>
      
        <FloatingText />
        <Footer />

        <Loader isLoad={isLoading}/>
     

    </>)
}

export default BlogPage;
import React , {useEffect , useState,useRef} from 'react'
import './Post.css'
import { Helmet } from 'react-helmet'


import {useParams} from 'react-router-dom'
import Navbar from '../GlobalComponents/Navbar'
import FloatingText from '../GlobalComponents/FloatingText'
import CommentForm from '../GlobalComponents/CommentForm'
import Comment from '../GlobalComponents/Comment'
import Footer from '../GlobalComponents/Footer'

import Axios from 'axios'
import Loader from '../GlobalComponents/Loader'




const Post = () =>{

    let { slug } = useParams()
    const [node,setNode]=useState()
    const[isLoading , setIsLoading] = useState(false)
    const[post , setPost]=useState({title:"", featureimg:"", content:"", timestamp:"", comments:[]})

    const postContent = React.useCallback(dom =>{
      if (dom !== null) {
          setNode(dom)
        }
      }, []);

    useEffect(()=>{
      getPostContent()
    },[])

   const getPostContent = async()=>{
      setIsLoading(true)
      await Axios.get(`/api/single-post?title=${slug}`).then((res)=> {
        setPost(res.data[0])
        setIsLoading(false)
      })
    }
  
    const refreshComments = ()=>{
       getPostContent()
    }

    if(node != undefined)
     node.innerHTML = post.content


    return (
        <>
          <Helmet>
           <title>{post.title}</title>
           <meta name="keywords" content="blog , blogging , react js, frelancing projects"></meta>
           <meta name="description" content="mini-cms website which has a good ui design build in reactjs and nodejs"></meta>
          </Helmet>

        <div className="page__nav_container">
        <Navbar />
       </div>
       <div>
         <h1 className="post__title" id="blog__top">{post.title.split(' ').slice(0,2).join(' ')}</h1>
         <h2 className="post__rest_title">--{post.title.split(' ').slice(2).join(' ')}</h2>
         <div className="post__feature__container" >
         <img className="post__feature__image" src={post.featureimg} alt={post.title}></img>
         </div>
          <p className="post__date">{post.timestamp}</p>
         
        <div ref={postContent} className="post__content">
        </div>
      


        <FloatingText />
        <CommentForm 
        type={"post"}
        title={slug}
        refresh={refreshComments}
        />

        <h3 className="comment_heading">Comments</h3>
        <Comment 
        comments={post.comments}/>
        <Footer />
        </div>

        <Loader isLoad={isLoading} /> 

    </>)
}

export default Post;
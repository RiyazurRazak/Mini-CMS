import React from 'react'
import './Comment.css'

import md5 from 'md5'



function Comment({comments}) {

 
    return (
        <div>
     {comments.map((comment , index)=>{
      return(
          <div key={index} className="comment__container">
          <ul className="uk-comment-list">
            <li>
               <article className="uk-comment uk-visible-toggle" tabIndex="-1">
                  <header className="uk-comment-header uk-position-relative">
                  <div className="uk-grid-medium uk-flex-middle" data-uk-grid>
                    <div className="uk-width-auto">
                        <img className="comment__avatar" src={`http://www.gravatar.com/avatar/${md5(comment.reqMail)}`+'.jpg?s='+80} alt=""></img>
                    </div>
                    <div className="uk-width-expand">
                        <h4 className="uk-comment-title uk-margin-remove comment__name">{comment.author}</h4>
                        <div>
                   <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                    </ul>
                   </div>
                    </div>
                   </div>
                   </header>
                   <div className="uk-comment-body">
                    <p className="comment__content">{comment.reqContent}</p>
                   </div>
               </article>
              </li>
             </ul>
             </div>
            )})}
        </div>
        
    )
}

export default Comment

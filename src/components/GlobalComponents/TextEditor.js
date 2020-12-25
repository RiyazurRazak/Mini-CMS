import React, { useState } from 'react'
import './TextEditor.css'

import { Editor } from '@tinymce/tinymce-react';



function TextEditor(props) {
  const[document , setdocument]=useState("")

  props.submit(document)
  
    return (
        <div className="texteditor__container">
     

         <Editor
         initialValue={document}
         init={{
           height: 800,
           menubar: true,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount', 
           ],
           toolbar:
             'undo redo | formatselect |visualblocks |link | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help | media |image | |',
             menubar: "file insert view "
         }}
         textareaName="texteditor"
         onEditorChange={(c)=> setdocument(c)}
       />  
        
     
        </div>
    )
}

export default TextEditor

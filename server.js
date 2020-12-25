import "@babel/polyfill"
import express from "express"
import React from "react"
import ReactDOMServer from 'react-dom/server'
import {StaticRouter} from "react-router"
import {Helmet} from 'react-helmet'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
const dotenv = require('dotenv').config()
import fileUpload from "express-fileupload"


import App from './src/App'

import routerHandller from './routers/router'


//config

const app = express()
const PORT = process.env.PORT || 9000
const  HOST = process.env.YOUR_HOST || '0.0.0.0'


//middlewares
app.use(express.static('build/public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(fileUpload())


mongoose.connect(process.env.MONGODB_URI , {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology:true});

mongoose.connection.once("open" , ()=>{
    console.log("connected")
})


app.use("/api", routerHandller)

app.get('/*' , (req, res)=>{
    const context = {}
    const content = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    )


    const helmet = Helmet.renderStatic()
    
const html = `<!doctype html>    
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="theme-color" content="#000000" />
${helmet.title.toString()}
${helmet.meta.toString()}
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.5.7/dist/css/uikit.min.css" />
<script src="https://cdn.jsdelivr.net/npm/uikit@3.5.7/dist/js/uikit.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/uikit@3.5.7/dist/js/uikit-icons.min.js"></script>  
 <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.14.0/css/all.css" integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Teko:wght@600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Long+Cang&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/client_bundle.css"></link>
  </head>
   <body>
     <div id="root">${content}</div>
     <script src="/client_bundle.js"> </script>
    </body>  
    </html>`

    res.send(html)

})


app.listen(PORT ,HOST, ()=>{
    console.log(`server runing in ${PORT}`)
})
const dotenv = require('dotenv').config()
import express from 'express'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import fileUploader from 'express-fileupload'
import fs from 'fs'
import cloudinary from 'cloudinary'


//models

import homeheadingModel from '../Models/homeheadingModel'
import avatarModel from '../Models/avatarModel'
import postModel from '../Models/postModel'
import portfolioModel from '../Models/portfolioModel'
import certificateModel from '../Models/certificateModel'
import userModel from '../Models/userModel'
import testimonialModel from '../Models/testimonialModel'


const router = express.Router()

//configs
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

router.get('/isuserlogged', authenticateToken, (req,res)=>{
    const currentUser = req.user.username;
    res.json({isSigned :true ,loggedUser : currentUser} )
    
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

//profileimg

router.get('/profileimage' , (req,res)=>{

  avatarModel.findOne({}, (err, img)=>{
      res.send(img)
  })

  //home heading
  
})
router.get('/homeheading' , (req,res)=>{

    homeheadingModel.find({} , (err , data)=>{
        if(err){
            res.status(500)
        }
        else{
            res.json(data)
        }
    })
})

//blogpost

router.get('/post' , (req , res)=>{

    postModel.find({}).sort({timestamp: -1}).exec(function (err, posts) {

        if(err){
            res.status(500)
        }
        else{
            res.json(posts)
        }
    })
})

router.get('/single-post' , (req, res)=>{
    const title = req.query.title
    postModel.find({title:title}, (err, post)=>{
        if(err) res.sendStatus(500)
        else res.json(post)
    })
})

//portfolio

router.get('/portfolio' , (req , res)=>{

    portfolioModel.find({} , (err , projects)=>{
        if(err){
            res.status(500)
        }
        else{
            res.json(projects)
        }
    })
})

router.get("/single-portfolio", (req,res)=>{
    const title = req.query.title

    portfolioModel.findOne({title: title} , (err , docs)=>{
        if (err) res.status(500)
        else res.json(docs)
    })
})

//certificates

router.get('/certificates' , (req , res)=>{

    certificateModel.find({} , (err , certificates)=>{

    if(err){
        res.status(500)
    }
    else{
        res.json(certificates)
    }
})
})

//testimonial

router.get('/testimonial' , (req , res)=>{


    testimonialModel.find({} , (err , testimonial)=>{
        if(err){
            res.status(500)
        }
        else{
            res.json(testimonial)
        }
    })
})

//  // /////////////////////////////////////////////////////////////////////////////////////////////////////////

//authentication


  
router.post('/login', (req , res, next)=>{

    const username = req.body.username
    const password = req.body.password

    userModel.findOne({ username: username }).then(user =>{
        if(!user) res.sendStatus(403)

        bcrypt.compare(password , user.password , (err , isMatch)=>{
             
            if(err){
               res.sendStatus(503)
            }
            if(isMatch){
                const accessToken = generateAccessToken(user)
                res.json({ accessToken: accessToken})
            }
            else{
                
              res.send('password not found')
            }

        })
    })
    
})

function generateAccessToken(user) {
    return jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3d' })
  }

// app.post('/api/createUser' , (req,res)=>{
//     const user = new userModel({
//         username:"admin"
//     })
//     bcrypt.genSalt(10 , (err , salt)=>{
//         bcrypt.hash("admin" , salt , (err , hash)=>{
//             user.password = hash
//             user.save()
//         })
//     })
    
//     res.send('success')
// })

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//postRequest


//profileImage

router.post('/updateprofileimg' , async(req, res)=>{

    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
    
    const file = req.files.file

    file.mv(`${__dirname}/public/assets/uploads/${file.name}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
    })
    await cloudinary.v2.uploader.upload(`${__dirname}/public/assets/uploads/${file.name}` , (err , result)=>{
        if(err) console.log(err)
        else{
     avatarModel.updateOne({type: "profileImage"},{
        name:file.name,
        uri: result.secure_url
     },(err , saved)=>{
        if(err){
            throw err
        }
    })
}})
fs.unlinkSync(`${__dirname}/public/assets/uploads/${file.name}`)
})

//homeHeadings

router.post('/homeheadingupdate' , (req, res)=>{

    const reqData = req.body

   for(let heading in reqData){
         if(!reqData[heading] == ""){
           homeheadingModel.update({headingType:heading},{
           headingType:heading,
           content:reqData[heading]
           },(err , updated)=>{
             if(err){
              throw err
            }})
          }
   }
   res.sendStatus(200)
})

//blogPost

router.post('/postupdate' , async(req, res)=>{

    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
    
    const file = req.files.file
    const reqTitle = req.body.title
    const reqDate = req.body.date
    const reqContent = req.body.content


    file.mv(`${__dirname}/public/assets/uploads/${file.name}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
    })

    await cloudinary.v2.uploader.upload(`${__dirname}/public/assets/uploads/${file.name}` , (err , result)=>{
        if(err) console.log(err)
        else{
       const postData = new postModel({
         title: reqTitle,
         timestamp: reqDate,
         content: reqContent,
         featureimg: result.secure_url
    })
    postData.save()
    res.send(true)
}})

fs.unlinkSync(`${__dirname}/public/assets/uploads/${file.name}`)

})

//portfolio

router.post('/portfolioupdate', async(req,res)=>{

    const reqTitle = req.body.title
    const reqFeatureContent = req.body.featurecontent
    const reqContent = req.body.content

    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
      const file = req.files
      const images = [];
      for(let img in file){
        file[img].mv(`${__dirname}/public/assets/uploads/${file[img].name}`, err => {
            if (err) {
              console.error(err);
              return res.status(500).send(err);
            }
        })
        await cloudinary.v2.uploader.upload(`${__dirname}/public/assets/uploads/${file[img].name}` , (err , result)=>{
            if(err) console.log(err)
            else
          images.push(result.secure_url)
        })
      }
 
      const portfolio = new portfolioModel({ 
          title: reqTitle,
          featurecontent:reqFeatureContent,
          content: reqContent,
          featureimg: images[0]
      })
       
       images.map((img)=>{
           portfolio.imagecollection.push(img)
       })
      portfolio.save()
      res.send(true)

})

//certificates

router.post('/certificatesupdate' , async(req, res)=>{

    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
    
    const file = req.files

    for(let img in file){
      file[img].mv(`${__dirname}/public/assets/uploads/${file[img].name}`, err => {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          } 
      })
      await cloudinary.v2.uploader.upload(`${__dirname}/public/assets/uploads/${file[img].name}` , (err , result)=>{
        if(err) console.log(err)
        else{
       const certificate = new certificateModel({
        certificate: result.secure_url
    })
    certificate.save()
    res.send(true)
    }})
}})

//testimonial

router.post('/testimonialupdate' , async(req, res)=>{

    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
    
    const avatar = req.files.file
    const reqName = req.body.name
    const reqContent = req.body.content



    avatar.mv(`${__dirname}/public/assets/uploads/${avatar.name}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
    })

    await cloudinary.v2.uploader.upload(`${__dirname}/public/assets/uploads/${avatar.name}` , (err , result)=>{
        if(err) console.log(err)
        else{
       const testimonail = new testimonialModel({
        name:reqName,
        content: reqContent,
        avatar: result.secure_url
    })
    testimonail.save()
    res.send(true)
}})
fs.unlinkSync(`${__dirname}/public/assets/uploads/${avatar.name}`)

})

//comments

router.post('/postcommentupdate' , (req,res)=>{

    const reqPostTitle = req.body.postTitle
    const reqName = req.body.name
    const reqMail = req.body.email
    const reqComment = req.body.comment
    
    postModel.updateOne({title: reqPostTitle} , {
        $push :{comments: [{
            author: reqName,
            reqMail: reqMail,
            reqContent: reqComment,
        }]}
    } , (err , result)=>{
        if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
    })
})

router.post('/portfoliocommentupdate' , (req,res)=>{

    const reqProjectTitle = req.body.postTitle
    const reqName = req.body.name
    const reqMail = req.body.email
    const reqComment = req.body.comment
    
    portfolioModel.updateOne({title: reqProjectTitle} , {
        $push :{comments: [{
            author: reqName,
            reqMail: reqMail,
            reqContent: reqComment,
        }]}
    } , (err , result)=>{
        if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
    })
})


export default router
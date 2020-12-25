import mongoose from 'mongoose'

const post = mongoose.Schema({
    title:String,
    timestamp:String,
    content:String,
    featureimg:String,
    comments:Array
})

const postModel = mongoose.model("post" , post)

export default  postModel
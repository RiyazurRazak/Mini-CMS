import mongoose from 'mongoose'

const certificate = mongoose.Schema({
   
    certificate:String
})

const certificateModel = mongoose.model("certificate" , certificate)
export default certificateModel 


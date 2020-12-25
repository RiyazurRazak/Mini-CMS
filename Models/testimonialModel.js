import mongoose from 'mongoose'

const testimonialSchema = mongoose.Schema({
    name:String,
    avatar:String,
    content:String
})

const testimonialModel = mongoose.model("testimonial" , testimonialSchema)

export default  testimonialModel
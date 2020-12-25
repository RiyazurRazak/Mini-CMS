import mongoose from 'mongoose'

const homeHeading = mongoose.Schema({
    headingType:String,
    content:String,
})

const homeheadingModel = mongoose.model("homeheading" , homeHeading)

export default  homeheadingModel

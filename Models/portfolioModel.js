import mongoose from 'mongoose'

const portfolio = mongoose.Schema({
    title:String,
    featurecontent:String,
    content:String,
    featureimg:String,
    imagecollection:Array,
    comments:Array
})

const portfolioModel = mongoose.model("portfolio" , portfolio)

export default  portfolioModel


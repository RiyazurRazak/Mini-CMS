import mongoose from 'mongoose'

const avatar = mongoose.Schema({
    type:String,
    name:String,
    uri:String
})

const profileavatarModel = mongoose.model("profileavatar" , avatar)

export default profileavatarModel
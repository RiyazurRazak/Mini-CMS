import mongoose from 'mongoose'


const user = mongoose.Schema({
    username: {type: String, required:true, unique:true}, 
    password: {type: String, required:true},
})

const userModel = mongoose.model("user" , user)

export default  userModel
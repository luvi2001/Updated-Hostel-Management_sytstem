const mongoose=require('mongoose')
const Schema=mongoose.Schema

const healthSchema=new Schema({
    name:{
        type:String,
        reqired:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },

    gender:{
        type:String,
        required:true
    },

    age:{
        type:Number,
        requred:true
    }
})

module.exports=mongoose.model('Health',healthSchema)
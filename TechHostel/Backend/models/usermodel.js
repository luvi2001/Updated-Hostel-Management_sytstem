const mongoose=require('mongoose')
const Schema=mongoose.Schema

const registerSchema=new Schema({
    name:{
        type:String,
        reqired:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },

    age:{
        type:Number,
        required:true
    },
    birthDate:{
        type: Date,
        required:true
    },
    nic:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    parentName:{
        type: String,
        required:true
    },
    phoneNumber:{
        type: String,
        required:true,
        unique:true
    }

})

module.exports=mongoose.model('hostler',registerSchema)
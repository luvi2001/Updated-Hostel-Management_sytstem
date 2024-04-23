const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ewalletSchema=new Schema({
   
    name:{
        type:String,
        required:true,
        
    },

    nic:{
        type:String,
        required:true,
        unique:true

    },

    balance:{
        type:Number,
        required:true,
        default:0
    }
    

})

module.exports=mongoose.model('ewallet',ewalletSchema)
const mongoose=require('mongoose')
const Schema=mongoose.Schema

const schemaData = mongoose.Schema({
    name:{
      type:String,
      required:true
  },
  nic:{
    type:String,
    required:true,
    unique:true
  },

  issue:{
      type:String,
      required:true
  },
  
  amount:{
      type:Number,
      required:true
  },
  
  }, {
      timestamps: true
  });
  
  module.exports = mongoose.model('expenses', schemaData);
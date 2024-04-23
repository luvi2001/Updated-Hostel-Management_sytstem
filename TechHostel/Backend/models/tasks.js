const mongoose=require('mongoose')
const Schema=mongoose.Schema

const schemaData = Schema({
    task_name:{
      type:String,
      required:true
  },
  message:{
    type:String,
    required:true,
  },
  status: { type: String, enum: ['not_done', 'job_done'], default: 'not_done' }
 
}, 

{ timestamps: true }
);

  
  module.exports = mongoose.model('tasksw', schemaData);
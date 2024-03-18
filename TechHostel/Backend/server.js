//Connection file to mongo db
const express=require('express');
const app = express();


app.get('/',(req,res) => {
  res.send("Welcome to project Tech?Hostel");

});

app.listen(5000,() =>{
  console.log("SERVWR IS WORKING ON PORT 5000");
});

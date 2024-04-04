const HealthProfile= require('../models/healthmodel')


const createHealthProfile= async(req,res) => {
    try{
        const {name,email,gender,age}=req.body;
        const newProfile=new HealthProfile({
            name,
            email,
            gender,
            age
            
        });

        await newProfile.save();
        res.status(201).json({ message: 'Health profile created', data: newProfile });
    }
    catch(err){
        cosole.log(err)
    }
}


const deleteProf= async(req,res) => {
    res.json({mssg:'deleted'})
}

module.exports={createHealthProfile,deleteProf}
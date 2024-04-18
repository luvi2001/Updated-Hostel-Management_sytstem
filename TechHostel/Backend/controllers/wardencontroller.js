const RegisterProfile= require('../models/usermodel')


const registerProfile= async(req,res) => {
    try{
        const {name,email,age,birthDate,nic,password,parentName,phoneNumber}=req.body;
        const newProfile=new RegisterProfile({
            name,
            email,
            age,
            birthDate,
            nic,
            password,
            parentName,
            phoneNumber
            
        });

        await newProfile.save();
        res.status(201).json({ message: 'Register profile created', data: newProfile });
    }
    catch(err){
        console.log(err)
    }
}


const getUserByName = async (req, res) => {
  try {
    const {name} = req.body;
    // Find user by name in the database
    const user = await RegisterProfile.findOne({ name });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

  const approveGatePass = async (req, res) => {
    try {
      const { ID } = req.params;
      const gatePass = await GatePass.findById(ID);
      if (!gatePass) {
        return res.status(404).json({ error: 'Gate pass not found' });
      }
      gatePass.status = 'approved';
      await gatePass.save();
      res.json({ message: 'Gate pass approved successfully', gatePass });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

module.exports={registerProfile,getUserByName,approveGatePass}
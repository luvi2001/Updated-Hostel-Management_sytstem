const RegisterProfile= require('../models/usermodel')
const GatePass=require('../models/securitymodel')
const Login=require('../models/loginmodel')
const bcrypt = require('bcrypt');


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


const loginValidate = async (req, res) => {
  const { email, password } = req.body;

  try {
      // Check if the user exists
      const user = await Login.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Compare provided password with stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid password' });
      }

      // Check user role
      if (user.role === 'warden') {
          // Redirect to admin panel route
          res.status(200).json({ message: 'Warden login' });
          // Don't send any more responses after redirecting
      } else if(user.role=== 'security'){
          // Redirect to security panel route
          res.status(200).json({ message: 'Security login' });
          // res.redirect('/security-panel');
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
}








const createLogin = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new login profile with hashed password
        const newProfile = new Login({
            email,
            password: hashedPassword, // Save the hashed password
            role
        });

        // Save the new profile
        await newProfile.save();

        res.status(201).json({ message: 'Login profile created', data: newProfile });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};





const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;
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

const getUserByNIC = async (req, res) => {
  try {
    const { nic } = req.params;
    // Find user by NIC in the database
    const user = await RegisterProfile.findOne({ nic });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    // Find user by name in the database
    const user = await RegisterProfile.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};





const getAllGatePasses = async (req, res) => {
  try {
    // Fetch all gate passes from the database
    const gatePasses = await GatePass.find();
    
    res.status(200).json(gatePasses);
  } catch (error) {
    console.error("Error fetching gate passes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllStudents = async (req, res) => {
  try {
    // Fetch all gate passes from the database
    const gatePasses = await RegisterProfile.find();
    
    res.status(200).json(gatePasses);
  } catch (error) {
    console.error("Error fetching gate passes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

  const approveGatePass = async (req, res) => {
    try {
      const { id } = req.params;
      const gatePass = await GatePass.findById(id);
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

  const dnapproveGatePass = async (req, res) => {
    try {
      const { id } = req.params;
      const gatePass = await GatePass.findById(id);
      if (!gatePass) {
        return res.status(404).json({ error: 'Gate pass not found' });
      }
      gatePass.status = 'not_verified';
      await gatePass.save();
      res.json({ message: 'Gate pass approved successfully', gatePass });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

module.exports={registerProfile,getUserByName,approveGatePass,getAllGatePasses,dnapproveGatePass,getAllStudents,getUserByID,getUserByNIC,createLogin,loginValidate}
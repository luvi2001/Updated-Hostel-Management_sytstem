const RegisterProfile= require('../models/registermodel')



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

  module.exports={getUserByName}

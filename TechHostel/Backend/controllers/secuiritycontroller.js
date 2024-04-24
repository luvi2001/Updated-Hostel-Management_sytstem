const RegisterProfile= require('../models/usermodel')
const GatePass = require('../models/securitymodel');


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




  const getGatePassesByNIC = async (req, res) => {
    try {
      const { nicNumber } = req.params;
      const gatePasses = await GatePass.find({ nic: nicNumber });
      if (!gatePasses) {
        return res.status(404).json({ error: 'No gate passes found for the given NIC number' });
      }
      res.json(gatePasses);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

// Controller for applying for a gate pass
const applyGatePass = async (req, res) => {
  try {
    const { applicantName,nic, reason } = req.body;
    const newGatePass = new GatePass({applicantName, nic, reason });
    await newGatePass.save();
    res.status(201).json({ message: 'Gate pass applied successfully', gatePass: newGatePass });
  } catch (error) {

    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Controller for verifying a gate pass
const verifyGatePass = async (req, res) => {
  try {
    const { id } = req.params;
    const gatePass = await GatePass.findById(id);
    if (!gatePass) {
      return res.status(404).json({ error: 'Gate pass not found' });
    }

   if (gatePass.status === 'approved') {
      // Update the gate pass status to 'approved'
    gatePass.status = 'verified';
    await gatePass.save();
    
    }

    res.json({ message: 'Gate pass verified successfully', gatePass });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const deleteGatePassById = async (req, res) => {
  try {
    const { id } = req.params;
    await GatePass.findByIdAndDelete(id);
    
    res.json({ message: 'Gate pass deleted successfully' });
  } catch (error) {
    console.error('Error deleting gate pass:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const dnverifyGatePass = async (req, res) => {
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

const updateStudentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedStudent = await RegisterProfile.findByIdAndUpdate(id, { status }, { new: true });

    res.status(200).json({ message: "Student status updated successfully", student: updatedStudent });
  } catch (error) {
    console.error("Error updating student status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};






  module.exports={getUserByName,deleteGatePassById,verifyGatePass,applyGatePass,getGatePassesByNIC,dnverifyGatePass,updateStudentStatus}

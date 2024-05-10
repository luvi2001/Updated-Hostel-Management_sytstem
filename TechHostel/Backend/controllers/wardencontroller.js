const RegisterProfile= require('../models/usermodel')
const GatePass=require('../models/securitymodel')
//const Login=require('../models/loginmodel')
const bcrypt = require('bcrypt');
const assignTask=require('../models/tasks')




const registerProfile = async (req, res) => {
    try {
        const { name, email, age, birthDate, nic, password, parentName, phoneNumber } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

        const newProfile = new RegisterProfile({
            name,
            email,
            age,
            birthDate,
            nic,
            password: hashedPassword, // Store the hashed password
            parentName,
            phoneNumber
        });

        await newProfile.save();
        res.status(201).json({ message: 'Register profile created', data: newProfile });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};









const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    // Find user by name in the database
    const user = await RegisterProfile.findOne({ name });

    
    if (!user) {
      res.status(200).json({ message: 'Student not found'});
   }else{

   res.status(200).json(user);
   }
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
       res.status(200).json({ message: 'Student not found'});
    }else{

    res.status(200).json(user);
    }
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


const addTasks= async (req, res) => {
  try {
    // Extract form data from request body
    const { task_name, message } = req.body;

    // Create a new FormData instance with the provided data
    const newFormData = new assignTask({
      task_name,
      message,
    });

    // Save the new FormData instance to the database
    await newFormData.save();

    // Send a success response
    res.status(201).json({ success: true, message: 'Task added successfully' });
  } catch (error) {
    // If an error occurs, send an error response
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'An error occurred while saving form data' });
  }
};


const getAllTasks = async (req, res) => {
  try {
    // Fetch all gate passes from the database
    const tasks = await assignTask.find();
    
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching gate passes:", error);
    res.status(500).json({ error: "Internal Server Error" });
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

    // Check if the gate pass status is already 'verified'
   if (gatePass.status !== 'verified') {
      // Update the gate pass status to 'approved'
    gatePass.status = 'approved';
    await gatePass.save();
    
    }

    
    
    
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

  const deleteTaskById = async (req, res) => {
    try {
      const { id } = req.params;
      await assignTask.findByIdAndDelete(id);
      
      res.json({ message: 'Gate pass deleted successfully' });
    } catch (error) {
      console.error('Error deleting gate pass:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const updateTask = async (req, res) => {
    const { id } = req.params; // Extract taskId from URL params
    const { taskName, description } = req.body; // Extract updated taskName and description from request body
  
    try {
      // Find the task by taskId
      const task = await assignTask.findById(id);
      
      if (!task) {
        // If task with the given ID doesn't exist, return 404 Not Found
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Update task properties
      task.task_name = taskName;
      task.message = description;
  
      // Save the updated task
      await task.save();
  
      // Respond with the updated task
      res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
      console.error('Error updating task:', error);
      // Handle database error or other errors
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  const deleteStudentProfile= async(req, res) => {
    try {
      const { id } = req.params;
      // Perform deletion logic here, for example:
      await RegisterProfile.findByIdAndDelete(id);
      res.status(200).send({ message: "Student deleted successfully" });
    } catch (error) {
      console.error("Error deleting student:", error);
      res.status(500).send({ error: "An error occurred while deleting the student" });
    }
  };

module.exports={deleteStudentProfile,registerProfile,getUserByName,approveGatePass,getAllGatePasses,dnapproveGatePass,getAllStudents,getUserByID,getUserByNIC,addTasks,getAllTasks,deleteTaskById,updateTask}
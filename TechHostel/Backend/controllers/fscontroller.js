const Task = require("../models/tasks");

const getAllTasks = async (req, res) => {
  try {
    // Fetch all tasks from the database
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const jobDone = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.status === 'not_done') {
      task.status = 'job_done';
      await task.save();
      res.json({ message: 'Task marked as job done successfully', task });
    } else {
      res.status(400).json({ error: 'Task is not in "not_done" status' });
    }
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const jobNotDone = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.status === 'job_done') {
      task.status = 'not_done';
      await task.save();
      res.json({ message: 'Task marked as not done successfully', task });
    } else {
      res.status(400).json({ error: 'Task is not in "job_done" status' });
    }
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { getAllTasks, jobDone, jobNotDone };

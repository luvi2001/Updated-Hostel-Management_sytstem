// Gettasks.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar4 from "../components/Navbar4";
import "../css/gatepasses.css"; // Import the CSS file
import Footer from "../components/Footer";

function Gettasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/fstaff/gettasks");
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("An error occurred while fetching tasks.");
      setLoading(false);
    }
  };

  const handleJobDone = async (taskId) => {
    try {
      await axios.put(`/api/fstaff/jobdone/${taskId}`, { status: "job_done" });
      // Refresh tasks after updating status
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
      // Handle error, if necessary
    }
  };

  const handleJobnotDone = async (taskId) => {
    try {
      await axios.put(`/api/fstaff/jobnotdone/${taskId}`, { status: "job_done" });
      // Refresh tasks after updating status
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
      // Handle error, if necessary
    }
  };

  return (
    <>
      <Navbar4 /><br/><br/>
      <div className="container">
        <h2>Tasks</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {tasks.map((task) => (
          <div className="task" key={task._id}>
            <h3>Task Name: {task.task_name}</h3>
            <p>Description: {task.message}</p>
            <p>Status: {task.status}</p>
            <p>Assigned At: {new Date(task.createdAt).toLocaleString()}</p>
            <p>Updated At: {new Date(task.updatedAt).toLocaleString()}</p>
            {task.status === "not_done" && (
              <button onClick={() => handleJobDone(task._id)}>Job Done</button>
            )}
             {task.status === "job_done" && (
              <button onClick={() => handleJobnotDone(task._id)}>Not Done</button>
            )}
            <hr className="hr-line" />
          </div>
        ))}
      </div>
    
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer/>
    </>
  );
}

export default Gettasks;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../css/gatepasses.css"; // Import the CSS file

function Gatepasses() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks= async () => {
    try {
      const response = await axios.get("/api/warden/gettasks");
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching gate passes:", error);
      setError("An error occurred while fetching gate passes.");
      setLoading(false);
    }
  };





  return (
    <>
      <Navbar /><br/><br/>
      <div className="container">
        <h2>Gate Passes</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {tasks.map((tasks) => (
          <div className="gate-pass" key={tasks._id}>
            <h3>Task Name: {tasks.task_name}</h3>
            <p>Description: {tasks.message}</p>
            <p>Status: {tasks.status}</p>
            <p>Assigned At: {tasks.createdAt}</p>
            <p>Updated At: {tasks.updatedAt}</p>
    
            
            <hr className="hr-line" />
          </div>
        ))}
      </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </>
  );
}

export default Gatepasses;

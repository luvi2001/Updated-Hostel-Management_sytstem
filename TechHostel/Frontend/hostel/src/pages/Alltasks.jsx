import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../css/gatepasses.css"; // Import the CSS file
import EditTask from "../components/Edittask";
import Footer from "../components/Footer";

function Alltasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks= async () => {
    try {
      const response = await axios.get("/api/warden/gettasks");
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("An error occurred while fetching tasks.");
      setLoading(false);
    }
  };

  const handleEdit = (taskId) => {
    setSelectedTaskId(taskId);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedTaskId(null);
  };

  const handleUpdateTasks = () => {
    fetchTasks(); // Refresh tasks after editing
    handleCloseModal(); // Close the modal after updating
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`/api/warden/delete/${taskId}`);
      // Remove the deleted task from the tasks list
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      // Handle error
    }
  };

  return (
    <>
      <Navbar /><br/><br/>
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
            <button onClick={() => handleEdit(task._id)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
            <hr className="hr-line" />
          </div>
        ))}
      </div>
      {showEditModal && (
        <EditTask taskId={selectedTaskId} onClose={handleCloseModal} onUpdate={handleUpdateTasks} />
      )}
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer/>
    </>
  );
}

export default Alltasks;

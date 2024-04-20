import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for routing
import Navbar from "../components/Navbar";
import '../css/allstudents.css'

function Allstudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api/warden/getstudents");
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError("An error occurred while fetching students.");
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar /><br/><br/><br/>
    <div className="all-students-container">
        <h2>All Hostelers</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {students.map((student) => (
          <div className="student-item" key={student._id}>
            <p>Name: {student.name}</p>
            <p>NIC: {student.nic}</p>
            <Link to={`/student/${student._id}`}>
              <button>View</button>
            </Link>
          </div>
      ))}
    </div>
    </>
  );
}

export default Allstudents;

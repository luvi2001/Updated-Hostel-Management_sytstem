import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../css/allstudents.css';
import Footer from '../components/Footer';

function Allstudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`/api/warden/deletestudent/${studentId}`);
      // After successful deletion, update the list of students
      //const updatedStudents = students.filter(student => student._id !== studentId);
      fetchStudents();
      //setStudents(updatedStudents);
    } catch (error) {
      console.error("Error deleting student:", error);
      setError("An error occurred while deleting the student.");
    }
  };
  

  // Calculate total number of students
  const totalStudents = students.length;

  // Filter students based on search query
  const filteredStudents = students.filter(student => {
    const nameMatch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const nicMatch = student.nic.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || nicMatch;
  });

  return (
    <>
      <Navbar /><br/><br/><br/>
      <div className="all-students-container">
        <h2 className="centre">All Hostelers</h2>
        <div className="container">
        <input
          type="text"
          placeholder="Search by name or NIC"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        </div>
        <p className="centre">Total Students: {totalStudents}</p><br/><br/>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {filteredStudents.map((student) => (
          <div className="student-item" key={student._id}>
            <p>Name: {student.name}</p>
            <p>NIC: {student.nic}</p>
            <Link to={`/student/${student._id}`}>
                <button>View</button>
            </Link>
           <button onClick={() => handleDelete(student._id)}>Delete</button>
          </div>
        ))}
      </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer/>
    </>
  );
}

export default Allstudents;

import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import '../css/table.css'
import Footer from "../components/Footer";

function SearchStudent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      // Check if the search term looks like a NIC (e.g., 9 digits followed by optional 'V', 'v', 'X', or 'x',
      // or 12 digits)
      if (/^\d{9}[vVxX]?$/.test(searchTerm) || /^\d{12}$/.test(searchTerm)) {
        response = await axios.get(`/api/warden/searchnic/${searchTerm}`);
      } else {
        response = await axios.get(`/api/warden/search/${searchTerm}`);
      }
      if (response.data.message === 'Student not found') {
        // Redirect to the desired route
        
        window.alert('Student not found');
      }
      setStudent(response.data);
    } catch (error) {
      console.error("Error searching for student:", error);
      setError("An error occurred while searching for the student.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Navbar /><br/><br/>
      <div>
      <div className="container">
        <h2>Search Student</h2>
        <div>
          <input
            type="text"
            placeholder="Enter student name or nic"
            value={searchTerm}
            onChange={handleChange}
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
        </div>
        {error && <div>Error: {error}</div>}
        {student && (
          <div className="tb">
            <h3>Student Details</h3>
            <table>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>{student.name}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{student.email}</td>
                </tr>
                <tr>
                  <td>Age:</td>
                  <td>{student.age}</td>
                </tr>
                <tr>
                  <td>Birth Date:</td>
                  <td>{student.birthDate}</td>
                </tr>
                <tr>
                  <td>NIC:</td>
                  <td>{student.nic}</td>
                </tr>
                <tr>
                  <td>Parent Name:</td>
                  <td>{student.parentName}</td>
                </tr>
                <tr>
                  <td>Phone Number:</td>
                  <td>{student.phoneNumber}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>{student.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
         
        )}
       </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
       <Footer/>
    </>
  );
}

export default SearchStudent;

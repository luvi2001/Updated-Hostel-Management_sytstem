import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/prof.css'; // Import the CSS file
import Navbar4 from "../components/Navbar4";
import Footer from "../components/Footer";

function StudentProf() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch student profile using the token from local storage
    const token = localStorage.getItem('token');
    if (token) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get('/api/student/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log(response.data)
          setProfile(response.data);
        } catch (error) {
          console.error('Error fetching student profile:', error);
        }
      };
      fetchProfile();
    }
  }, []);

  return (
    <>
    <Navbar4 /><br/><br/><br/><br/>
    <div className="profile-container">
      <h2>Student Profile</h2>
      {profile ? (
        <div className="profile-details">
          <p><strong>Name:</strong> {profile.user.name}</p>
          <p><strong>Email:</strong> {profile.user.email}</p>
          <p><strong>Parent Name:</strong> {profile.user.parentName}</p>
          <p><strong>NIC:</strong> {profile.user.nic}</p>
          <p><strong>Age:</strong> {profile.user.age}</p>
          <p><strong>Mobile number:</strong> {profile.user.phoneNumber}</p>
          <p><strong>Status:</strong> {profile.user.status}</p>

          

          
          {/* Add other profile fields as needed */}
        </div>
      ) : (
        <p className="loading">Loading profile...</p>
      )}
    </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

    <Footer />
    </>
  );
}

export default StudentProf;

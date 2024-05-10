import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar4 from '../components/Navbar4';
import Footer from '../components/Footer';

function Applygatepass() {
  const [studentInfo, setStudentInfo] = useState(null);
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch student info using the token from local storage
    const token = localStorage.getItem('token');
    if (token) {
      const fetchStudentInfo = async () => {
        try {
          const response = await axios.get('/api/student/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setStudentInfo(response.data.user);
        } catch (error) {
          console.error('Error fetching student info:', error);
          setError('Error fetching student info');
        }
      };
      fetchStudentInfo();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentInfo) {
      setError('Student info not available');
      return;
    }
    try {
      const response = await axios.post('/api/security/apply', {
        applicantName: studentInfo.name,
        nic: studentInfo.nic,
        reason
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error applying for gate pass:', error);
      setError('Error applying for gate pass');
    }
  };

  return (
    <>

    <Navbar4 /><br/><br/><br/><br/><br/>
    <div className='container'>
      <h2>Gate Pass Application</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {studentInfo ? (
        <form onSubmit={handleSubmit}>
          <p><strong>Name:</strong> {studentInfo.name}</p>
          <p><strong>NIC:</strong> {studentInfo.nic}</p>
          <label htmlFor="reason">Reason:</label>
          <input type="text" id="reason" value={reason} onChange={(e) => setReason(e.target.value)} />
          <button type="submit">Apply</button>
        </form>
      ) : (
        <p>Loading student info...</p>
      )}
    </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <Footer />
    </>
  );
}

export default Applygatepass;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../css/register.css';

function Studentlogin({}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onLogin = (user, token) => {
    // Your login logic here
    console.log('User logged in:', user);
    console.log('Token:', token);
  
    // Example: Storing user data and token in local storage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  
    // Example: Redirecting to a dashboard page
    navigate("/getprof");
  };

  const handleLogin = async () => {
    try {
        const response = await axios.post('/api/student/log', { email, password });
        console.log('Response:', response); // Log the response to see its structure
        const { user, token } = response.data; // Check if response.data is defined
        console.log('User:', user);
        console.log('Token:', token);
        onLogin(user, token);
        
      } catch (error) {
        console.error('Login error:', error);
        setError(error.response.data.message);
      }
  };

  return (
    <><br/><br/><br/><br/><br/><br/>
    <div className='container'>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
          <label>Email:</label><br/>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label><br/>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      <button onClick={handleLogin}>Login</button>
    </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </>
  );
}

export default Studentlogin;

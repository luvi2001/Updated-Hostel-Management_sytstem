import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../css/register.css';

function Studentlogin({}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onLogin = (user) => {  // ← REMOVE token parameter
    console.log('User logged in:', user);
    
    // Store ONLY user info in localStorage (no token!)
    localStorage.setItem('user', JSON.stringify(user));
    // REMOVED: localStorage.setItem('token', token); ← DELETE THIS LINE
    
    navigate("/getprof");
  };

  const handleLogin = async () => {
    try {
        const response = await axios.post('/api/student/log', 
          { email, password }, 
          { withCredentials: true }  // ← ADD THIS - sends/receives cookies
        );
        console.log('Response:', response);
        
        // Token is now in HttpOnly cookie, NOT in response
        const { user } = response.data; // ← NO MORE token in response
        console.log('User:', user);
        
        onLogin(user); // ← Pass only user, no token
        
      } catch (error) {
        console.error('Login error:', error);
        setError(error.response?.data?.message || 'Login failed');
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
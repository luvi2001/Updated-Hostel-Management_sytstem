import React, { useState } from 'react';
import axios from 'axios';
import '../css/register.css';
import { useNavigate } from "react-router-dom";



const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/auth/validatelogin', { email, password });
      
      if (response.data.message === 'Warden login') {
        // Redirect to the desired route
        navigate("/register"); // Replace '/dashboard' with the desired route
        window.alert('Warden login');
      }
      else if(response.data.message === 'Security login'){
        navigate("/securityhome");
        window.alert('Security login');
      }

      // Show a pop-up message for successful login
      

      // Redirect to dashboard or any other page upon successful login
      // Example: history.push('/dashboard');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <>
    <br/><br/><br/><br/>
    <div className='container'>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    </>
  );
};

export default Loginpage;

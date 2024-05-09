import React, { useState } from 'react';
import axios from 'axios';
import '../css/register.css';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';



const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/auth/validatelogin', { email, password });
      
      localStorage.setItem('token', response.data.token);

      if (response.data.message === 'Warden login') {
        // Redirect to the desired route
        navigate("/register"); // Replace '/dashboard' with the desired route
        window.alert('Warden login');
      }
      else if(response.data.message === 'Security login'){
        navigate("/securityhome");
        window.alert('Security login');
      }

      else if(response.data.message === 'Paymentstaff login'){
        navigate("/payment");
        window.alert('Paymentstaff login');
      }

      else if(response.data.message === 'Fstaff login'){
        navigate("/gettasks");
        window.alert('Facility staff login');
      }


      
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
    </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <Footer/>
    </>
  );
};

export default Loginpage;

import React, { useState } from 'react';
import axios from 'axios';
import '../css/register.css';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
import { GoogleLogin } from "@react-oauth/google";

const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 🔹 Normal login (warden, staff)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/validatelogin', { email, password });

      localStorage.setItem('token', response.data.token);

      if (response.data.message === 'Warden login') {
        navigate("/register");
        window.alert('Warden login');
      } else if (response.data.message === 'Security login') {
        navigate("/securityhome");
        window.alert('Security login');
      } else if (response.data.message === 'Paymentstaff login') {
        navigate("/payment");
        window.alert('Paymentstaff login');
      } else if (response.data.message === 'Fstaff login') {
        navigate("/gettasks");
        window.alert('Facility staff login');
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // 🔹 Google login (students only)
// 🔹 Google login (students only)
const handleGoogleSuccess = async (credentialResponse) => {
  const token = credentialResponse.credential;

  try {
    await axios.post("/api/student/google-login", { token }, { withCredentials: true });

    window.alert("Student login success");
    navigate("/getprof");
  } catch (err) {
    console.error("Google login failed", err);
    window.alert("You are not registered by the warden");
  }
};


  return (
    <>
      <br /><br /><br /><br />
      <div className="container">
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* STAFF + WARDEN LOGIN FORM */}
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

        <hr style={{ margin: "30px 0" }} />

        {/* STUDENT LOGIN WITH GOOGLE */}
        <div>
          <h3>Student Login</h3>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log("Google Login Failed")}
          />
        </div>
      </div>

      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <Footer />
    </>
  );
};

export default Loginpage;

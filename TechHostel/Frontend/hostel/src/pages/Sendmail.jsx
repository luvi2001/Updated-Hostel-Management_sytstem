import React, { useRef, useState } from 'react';
import Navbar from "../components/Navbar";
import axios from 'axios';
import "../css/register.css"
import Footer from "../components/Footer";

const Sendmail = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    task_name: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your backend API endpoint
      const response = await axios.post('/api/warden/addtask', formData);
      if (response.data.success) {
        
        alert(response.data.message);
        console.log(response.data);
      }
      // Handle successful response
      
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar /><br/><br/><br />
      <div className="container">
        <div className="inquiryMessage">
          <form ref={form} onSubmit={handleSubmit}>
            <fieldset>
              <legend>Assign Task:</legend>
              <label>Name</label>
              <input type="text" name="task_name" value={formData.user_name} onChange={handleInputChange} />
              <label>Description</label>
              <textarea name="message" value={formData.message} onChange={handleInputChange} />
              <input className="btnbt" type="submit" value="Send"  />
            </fieldset>
          </form>
        </div>
      </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer/>
    </>
  );
};

export default Sendmail;

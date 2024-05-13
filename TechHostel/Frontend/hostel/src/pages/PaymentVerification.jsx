// PaymentVerification.js

import React, { useState, useEffect } from "react"; // Import useEffect from React
import axios from "axios";
import '../css/register.css';
import Navbar4 from "../components/Navbar4";
import Footer from "../components/Footer";

const PaymentVerification = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    nicNumber: "",
    accountNumber: "",
    bank: "",
    amount: "",
    date: "",
  });

  const [studentInfo, setStudentInfo] = useState(null);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/payment/verify", formData);
      console.log(response.data);
      // If payment details added successfully, show success alert
      if (response.data.success) {
        window.alert("Payment details added successfully!");
      }
      // Reset form after successful submission
      setFormData({
        studentName: "",
        nicNumber: "",
        accountNumber: "",
        bank: "",
        amount: "",
        date: "",
      });
    } catch (error) {
      console.error("Error submitting payment details:", error);
      // Handle error message
    }
  };

  return (
    <>
      <Navbar4 /><br/><br/>
      <div className="container">
        <form onSubmit={handleSubmit} className="payment-form">
          {studentInfo && (
            <>
              <label>
                Student Name:
                <input
                  type="text"
                  name="studentName"
                  value={studentInfo.name}
                  onChange={handleChange}
                  required
                  readOnly
                />
              </label><br/>
              <label>
                NIC Number:
                <input
                  type="text"
                  name="nicNumber"
                  value={studentInfo.nic}
                  onChange={handleChange}
                  maxLength="10"
                  required
                  readOnly
                />
              </label>
            </>
          )}
          <label>
            Account Number:
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              maxLength="12"
              required
            />
          </label>
          <label>
            Bank:
            <input
              type="text"
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Amount:
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer />
    </>
  );
};

export default PaymentVerification;

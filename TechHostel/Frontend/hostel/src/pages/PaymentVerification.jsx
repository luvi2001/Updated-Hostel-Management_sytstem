// PaymentVerification.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/register.css";
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
  const [error, setError] = useState("");

  // ✅ Ensure axios always sends cookies
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const response = await axios.get("/api/student/profile", {
          withCredentials: true, // ✅ include cookies
        });
        setStudentInfo(response.data.user);
      } catch (error) {
        console.error("Error fetching student info:", error);
        setError("Error fetching student info");
      }
    };

    fetchStudentInfo();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Include cookies in POST as well
      const response = await axios.post("/api/payment/verify", formData, {
        withCredentials: true,
      });

      if (response.data.success) {
        window.alert("Payment details added successfully!");
      }

      // Reset form
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
      setError("Error submitting payment details");
    }
  };

  return (
    <>
      <Navbar4 />
      <br />
      <br />
      <div className="container">
        <form onSubmit={handleSubmit} className="payment-form">
          {error && <p style={{ color: "red" }}>{error}</p>}

          {studentInfo && (
            <>
              <label>
                Student Name:
                <input
                  type="text"
                  name="studentName"
                  value={studentInfo.name}
                  readOnly
                  required
                />
              </label>
              <br />
              <label>
                NIC Number:
                <input
                  type="text"
                  name="nicNumber"
                  value={studentInfo.nic}
                  readOnly
                  required
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
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default PaymentVerification;

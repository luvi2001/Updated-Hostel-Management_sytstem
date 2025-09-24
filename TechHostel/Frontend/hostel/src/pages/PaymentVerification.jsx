// PaymentVerification.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/register.css";
import Navbar4 from "../components/Navbar4";
import Footer from "../components/Footer";

// 🔒 sanitize function (basic filter for MongoDB/HTML injection)
const sanitizeInput = (value) => {
  if (typeof value !== "string") return value;
  return value.replace(/[${}<>;]/g, ""); // strip dangerous chars
};

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
<<<<<<< HEAD
=======

  // ✅ Ensure axios always sends cookies
  axios.defaults.withCredentials = true;
>>>>>>> c83a12075bb183651b580f0a8ed97219f1455880

  // ✅ Fetch student info from backend using token
  useEffect(() => {
<<<<<<< HEAD
    const token = localStorage.getItem("token");
    if (token) {
      const fetchStudentInfo = async () => {
        try {
          const response = await axios.get("/api/student/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setStudentInfo(response.data.user);
        } catch (error) {
          console.error("Error fetching student info:", error);
          setError("Error fetching student info");
        }
      };
      fetchStudentInfo();
    }
=======
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
>>>>>>> c83a12075bb183651b580f0a8ed97219f1455880
  }, []);

  // ✅ Handle form change securely
  const handleChange = (e) => {
    let value = e.target.value;

    // sanitize inputs
    if (e.target.name === "amount") {
      // allow only numbers
      value = value.replace(/[^0-9.]/g, "");
    } else {
      value = sanitizeInput(value);
    }

    setFormData({ ...formData, [e.target.name]: value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const response = await axios.post("/api/payment/verify", formData);
=======
      // ✅ Include cookies in POST as well
      const response = await axios.post("/api/payment/verify", formData, {
        withCredentials: true,
      });
>>>>>>> c83a12075bb183651b580f0a8ed97219f1455880

      if (response.data.success) {
        window.alert("✅ Payment details added successfully!");
        setFormData({
          studentName: "",
          nicNumber: "",
          accountNumber: "",
          bank: "",
          amount: "",
          date: "",
        });
      } else {
        window.alert("❌ Error: " + (response.data.error || "Invalid data"));
      }
<<<<<<< HEAD
=======

      // Reset form
      setFormData({
        studentName: "",
        nicNumber: "",
        accountNumber: "",
        bank: "",
        amount: "",
        date: "",
      });
>>>>>>> c83a12075bb183651b580f0a8ed97219f1455880
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
<<<<<<< HEAD
                  maxLength="12"
=======
>>>>>>> c83a12075bb183651b580f0a8ed97219f1455880
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
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="1"
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
<<<<<<< HEAD

        {error && <p className="error-message">{error}</p>}
      </div>
      <br />
      <br />
=======
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
>>>>>>> c83a12075bb183651b580f0a8ed97219f1455880
      <Footer />
    </>
  );
};

export default PaymentVerification;

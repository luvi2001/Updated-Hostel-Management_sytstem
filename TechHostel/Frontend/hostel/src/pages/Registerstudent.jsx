import { useState } from "react";
import * as Yup from "yup";
import "../css/register.css";
import axios from "axios";
import Navbar from "../components/Navbar";
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Registerstudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    birthDate: "",
    nic: "",
    parentName: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({

    parentName: Yup.string().required("Parent Name is Required"),

    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email format"),

    nic: Yup.string()
      .required("NIC is required")
      .test(
        "is-valid-nic",
        "NIC should match one of the formats",
        (value) => {
          const regex1 = /^\d{9}[vVxX]?$/;
          const regex2 = /^\d{12}$/;
          return regex1.test(value) || regex2.test(value);
        }
      ),

    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")
      .required("Phone number is required"),

    age: Yup.number()
      .typeError("Age must be a number")
      .min(18, "You must be at least 18 years old")
      .max(100, "You cannot be older than 100 years")
      .required("Age is required"),

    birthDate: Yup.date().required("Date of birth is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      // Save student details
      const response = await axios.post("/api/warden/register", formData);
      window.alert("Registration successful");

      // Create wallet
      const { name, nic, email } = formData;
      await axios.post("/api/payment/createewallet", { name, nic });
      await axios.post("/api/payment/createexpense", { name, nic });

      // Register auth record for Google login
      await axios.post("/api/student/authstudent", { email });

      window.alert("Student registered and ready for Google login");
      navigate("/register");

      setErrors({});
      console.log("Form submitted:", response.data);
    } catch (error) {
      if (error.inner) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error(error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Navbar />
      <br />
      <br />
      <div className="cn">
        <div className="container">
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Enter your first name"
                onChange={handleChange}
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>

            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>

            <div>
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                placeholder="Enter your age"
                onChange={handleChange}
              />
              {errors.age && <div className="error">{errors.age}</div>}
            </div>

            <div>
              <label>Date of Birth:</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                placeholder="Enter your date of birth"
                onChange={handleChange}
              />
              {errors.birthDate && (
                <div className="error">{errors.birthDate}</div>
              )}
            </div>

            <div>
              <label>NIC:</label>
              <br />
              <input
                type="text"
                name="nic"
                value={formData.nic}
                placeholder="Enter your NIC number"
                onChange={handleChange}
              />
              {errors.nic && <div className="error">{errors.nic}</div>}
            </div>

            <div>
              <label>Parent Name:</label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                placeholder="Enter your parent name"
                onChange={handleChange}
              />
              {errors.parentName && (
                <div className="error">{errors.parentName}</div>
              )}
            </div>

            <div>
              <label>Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                placeholder="Enter your phone number"
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <div className="error">{errors.phoneNumber}</div>
              )}
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
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
      <Footer />
    </>
  );
};

export default Registerstudent;

import { useState} from "react";
import * as Yup from "yup";
//import { Link } from 'react-router-dom'
import '../css/register.css'
import axios from 'axios';
import Navbar from "../components/Navbar";
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";



const Registerstudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age:"",
    birthDate: "",
    nic:"",
    password: "",
    confirmPassword: "",
    parentName: "",
    phoneNumber: "",
  });


  const navigate = useNavigate();
  





  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    name: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Name must contain only letters")
    .required("First Name is Required"),

    parentName: Yup.string().required("Parent Name is Required"),

    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email format"),


      nic: Yup.string()
      .required("NIC is required")
      .test(
          "is-valid-nic",
          "NIC should match one of the formats",
          value => {
              // Regular expressions for NIC formats
              const regex1 = /^\d{9}[vVxX]?$/;
              const regex2 = /^\d{12}$/;
  
              // Check if the value matches at least one of the patterns
              return regex1.test(value) || regex2.test(value);
          }
      ),
  
  

    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")
      .required(),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),

    age: Yup.number()
      .typeError("Age must be a number")
      .min(18, "You must be at least 18 years old")
      .max(100, "You cannot be older than 100 years")
      .required("Age is required"),
    birthDate: Yup.date().required("Date of birth is required"),

  });

  const handleSubmit = async (e) => {
    e.preventDefault();



    const nonParsed = {
      name: "Piyush",
      email: "piyush@example.com",
      age: "18",
      birthDate: "2024-02-12",
      nic:"200111203991",
      password: "123456Qq*",
      confirmPassword: "123456Qq*",
      parentName:"Taylor",
      phoneNumber: "1231234218",
     };

    const parsedUser = validationSchema.cast(nonParsed);

    console.log(nonParsed, parsedUser);

    try {
        await validationSchema.validate(formData, { abortEarly: false });
        const response = await axios.post('/api/warden/register', formData);
        window.alert('Registration sucessful')

        const { name, nic ,password,email} = formData;

        // Send request to create ewallet entry
        const ewalletData = { name, nic };
        const ewalletResponse = await axios.post('/api/payment/createewallet', ewalletData);
        window.alert('E-wallet created successfully');


        const expensesData = { name, nic };
        const expenseResponse = await axios.post('/api/payment/createexpense', expensesData);
        window.alert('Expenses created successfully');

        const auth = { email, password };
        const st=await axios.post('/api/student/authstudent', auth);
        window.alert('Student created successfully');


        
        navigate('/register')
    
        // Reset errors state
        setErrors({});
        
        // Navigate to another page if needed
        // navigate('/some-other-page');
    
        console.log('Form submitted:', response.data);
        console.log('E-wallet created:', ewalletResponse.data);
        console.log('Expense created:', expenseResponse.data);
        console.log('student created:', st.data);

      } catch (error) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
      
  };

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

 

  return (
    <>
    
		<Navbar />
    
	  <br/><br/>
    <div  className="cn">
    <div className="container" >
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
        {errors.birthDate && <div className="error">{errors.birthDate}</div>}
      </div>

      <div>
        <label>NIC:</label><br/>
        <input
          type="text"
          name="nic"
          value={formData.nic}
          placeholder="Enter your nic no"
          onChange={handleChange}
        />
        {errors.nic && (
          <div className="error">{errors.nic}</div>
        )}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Enter your password"
          onChange={handleChange}
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>

      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Confirm your password"
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword}</div>
        )}
      </div>

      <div>
        <label>Parent Name:</label>
        <input
          type="text"
          name="parentName"
          value={formData.parentName}
          placeholder="Enter your Parent name"
          onChange={handleChange}
        />
        {errors.parentName && <div className="error">{errors.parentName}</div>}
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
   </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
   <Footer/>
   </>
  );
};

export default Registerstudent;
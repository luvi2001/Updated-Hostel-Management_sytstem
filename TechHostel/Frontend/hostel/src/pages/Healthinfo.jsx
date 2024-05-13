import React, { useState } from "react";
import axios from "axios";
import '../css/register.css'
import Navbar5 from "../components/Navbar5";
import Footer from "../components/Footer";


const Healthinfo = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Diet",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/healthInfoRoutes/", formData);
      console.log(response.data.message);
      setFormData({ title: "", description: "", category: "Diet" });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
    <Navbar5 /><br/><br/><br/><br/>
    <div className="container">
      <h1>Create Health Info</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="description">Description:</label><br />
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          cols="50"
          required
        ></textarea><br /><br />

        <label htmlFor="category">Category:</label><br/>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="Diet">Diet</option>
          <option value="Exercise">Exercise</option>
          <option value="Mental Health">Mental Health</option>
        </select><br /><br />

        <button type="submit">Save Health Info</button>
      </form>
    </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <Footer/ >
    </>
  );
};

export default Healthinfo;

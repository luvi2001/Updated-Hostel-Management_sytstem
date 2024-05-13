import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../css/healthtable.css'; // Import the CSS file
import Navbar5 from '../components/Navbar5';
import Footer from '../components/Footer';

const HealthInfoTable = () => {
  const [healthInfos, setHealthInfos] = useState([]);

  useEffect(() => {
    const fetchHealthInfos = async () => {
      try {
        const response = await axios.get('/api/healthInfoRoutes');
        setHealthInfos(response.data.healthInfos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHealthInfos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/healthInfoRoutes/${id}`);
      setHealthInfos(healthInfos.filter((info) => info._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Navbar5 /><br/><br/><br/><br/>
    <div>
      <h1>Health Information</h1>
      <table className="table-container">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {healthInfos.map((info) => (
            <tr key={info._id}>
              <td>{info.title}</td>
              <td>{info.description}</td>
              <td>{info.category}</td>
              <td>
                <button onClick={() => handleDelete(info._id)}><FaTrash /></button>
                <button><FaEdit /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div><br/><br/><br/><br/><br/><br/><br/><br/>
    <Footer />
    </>
  );
};

export default HealthInfoTable;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../css/gatepasses.css"; // Import the CSS file

function Gatepasses() {
  const [gatePasses, setGatePasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGatePasses();
  }, []);

  const fetchGatePasses = async () => {
    try {
      const response = await axios.get("/api/warden/getgatepasses");
      setGatePasses(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching gate passes:", error);
      setError("An error occurred while fetching gate passes.");
      setLoading(false);
    }
  };

  const handleApprove = async (gatePassId) => {
    try {
      await axios.put(`/api/warden/approve/${gatePassId}`, { status: "approved" });
      // After updating status, refetch gate passes to update the UI
      fetchGatePasses();
    } catch (error) {
      console.error("Error approving gate pass:", error);
      setError("An error occurred while approving the gate pass.");
    }
  };

  const handleDnApprove = async (gatePassId) => {
    try {
      await axios.put(`/api/warden/dnapprove/${gatePassId}`, { status: "approved" });
      // After updating status, refetch gate passes to update the UI
      fetchGatePasses();
    } catch (error) {
      console.error("Error approving gate pass:", error);
      setError("An error occurred while approving the gate pass.");
    }
  };

  return (
    <>
      <Navbar /><br/><br/>
      <div className="container">
        <h2>Gate Passes</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {gatePasses.map((gatePass) => (
          <div className="gate-pass" key={gatePass._id}>
            <h3>Applicant Name: {gatePass.applicantName}</h3>
            <p>NIC: {gatePass.nic}</p>
            <p>Reason: {gatePass.reason}</p>
            <p className="status">Status: {gatePass.status}</p>
            {gatePass.status !== "approved" && (
              <button className="approve-button" onClick={() => handleApprove(gatePass._id)}>
                Approve
              </button>
            )}
            {gatePass.status === "approved" && (
              <button className="approve-button" onClick={() => handleDnApprove(gatePass._id)}>
                Do not Approve
              </button>)}
            <hr className="hr-line" />
          </div>
        ))}
      </div>
    </>
  );
}

export default Gatepasses;

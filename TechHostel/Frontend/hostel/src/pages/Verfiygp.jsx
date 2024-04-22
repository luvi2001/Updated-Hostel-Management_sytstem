import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar2 from "../components/Navbar2";
import "../css/gatepasses.css"; // Import the CSS file

function Verfiygp() {
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
      await axios.put(`/api/security/verify/${gatePassId}`, { status: "verified" });
      // After updating status, refetch gate passes to update the UI
      fetchGatePasses();
    } catch (error) {
      console.error("Error approving gate pass:", error);
      setError("An error occurred while approving the gate pass.");
    }
  };

  const handleDnApprove = async (gatePassId) => {
    try {
      await axios.put(`/api/security/dnverify/${gatePassId}`, { status: "verified" });
      // After updating status, refetch gate passes to update the UI
      fetchGatePasses();
    } catch (error) {
      console.error("Error approving gate pass:", error);
      setError("An error occurred while approving the gate pass.");
    }
  };

  return (
    <>
      <Navbar2 /><br/><br/>
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
            {gatePass.status !== "verified" && (
              <button className="approve-button" onClick={() => handleApprove(gatePass._id)}>
                Verify
              </button>
            )}
            {gatePass.status === "verified" && (
              <button className="approve-button" onClick={() => handleDnApprove(gatePass._id)}>
                Do not Verify
              </button>)}
            <hr className="hr-line" />
          </div>
        ))}
      </div>
    </>
  );
}

export default Verfiygp;

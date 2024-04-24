// Verfiygp.js
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Navbar2 from "../components/Navbar2";
import "../css/gatepasses.css"; // Import the CSS file
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Footer from "../components/Footer";


function Verfiygp() {
  const [gatePasses, setGatePasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pdfRef = useRef();


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

  const handleDelete = async (gatePassId) => {
    try {
      await axios.delete(`/api/security/delete/${gatePassId}`);
      // After deletion, refetch gate passes to update the UI
      fetchGatePasses();
    } catch (error) {
      console.error("Error deleting gate pass:", error);
      setError("An error occurred while deleting the gate pass.");
    }
  };

  const downloadPDF = () => {
    const input = pdfRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('invoice.pdf');
    });
  };


  return (
    <>
      <Navbar2 /><br/><br/>
      <div className="container">
        <h2>Gate Passes</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {gatePasses.map((gatePass) => (
          <div className="gate-pass" key={gatePass._id} >
            <div ref={pdfRef}>
            <h3>Applicant Name: {gatePass.applicantName}</h3>
            <p>NIC: {gatePass.nic}</p>
            <p>Reason: {gatePass.reason}</p>
            <p>Created at: {gatePass.createdAt}</p>
            <p>Updated At: {gatePass.updatedAt}</p>
            <p>Assigned At: {new Date(gatePass.createdAt).toLocaleString()}</p>
            <p>Updated At: {new Date(gatePass.updatedAt).toLocaleString()}</p>
            <p className="status">Status: {gatePass.status}</p>

            </div>
            {gatePass.status !== "verified" && (
              <button className="approve-button" onClick={() => handleApprove(gatePass._id)}>
                Verify
              </button>
            )}
            {gatePass.status === "verified" && (
              <button className="app-button" onClick={() => handleDnApprove(gatePass._id)}>
                Do not Verify
              </button>
            )}
            <button className="app-button" onClick={() => handleDelete(gatePass._id)}>
              Delete
            </button>
            
            <button className="app-button" onClick={downloadPDF}>Download</button>
   
            <hr className="hr-line" />
          </div>
        ))}
      </div><br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer/>
    </>
  );
}

export default Verfiygp;

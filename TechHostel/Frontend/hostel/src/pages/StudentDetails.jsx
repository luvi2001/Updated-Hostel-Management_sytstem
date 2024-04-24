import React, { useRef,useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to access route parameters
import '../css/studentdetail.css'
import Navbar from "../components/Navbar";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Footer from "../components/Footer";


function StudentDetails() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use useParams to access route parameters
  const { id } = useParams();
  const pdfRef = useRef();

  useEffect(() => {
    console.log("useEffect in StudentDetails is triggered"); // Log message

    const fetchStudent = async () => {
      try {
        const response = await axios.get(`/api/warden/getstudent/${id}`); // Access id from useParams
        setStudent(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student:", error);
        setError("An error occurred while fetching student details.");
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]); // Listen for changes in id parameter

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!student) return <p>No student found.</p>;




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
    <Navbar /><br/><br/><br/>
    <div className="student-details-container">
      <div className="innercontainer" ref={pdfRef}>
      <h2>Student Details</h2>

      <label>Name</label>
      <p> {student.name}</p>

      <label>NIC</label>
      <p>{student.nic}</p>

      <label>Email</label>
      <p>{student.email}</p>

      <label>Age</label>
      <p>{student.age}</p>

      <label>Mobile No</label>
      <p>{student.phoneNumber}</p>

      <label>Parent Name</label>
      <p>{student.parentName}</p>

      <label>DOB</label>
      <p>{student.birthDate}</p>
      </div>
      <div className="btn">
   <button onClick={downloadPDF}>Download</button>
   </div>
   </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    
   <Footer/>
    </>
  );
}

export default StudentDetails;

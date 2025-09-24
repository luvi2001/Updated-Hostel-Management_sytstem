import "../css/payment.css";
import { React, useEffect, useState, useRef } from "react";
import axios from "axios";
import FormTable from "../components/Formtable";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Navbar3 from "../components/Navbar3";
import Footer from "../components/Footer";

// ✅ Base URL
axios.defaults.baseURL = "http://localhost:8000/";

// ✅ Simple sanitizer
const sanitizeInput = (value) => {
  if (typeof value !== "string") return value;
  return value.replace(/[${}<>;]/g, "").trim(); // strip NoSQL/HTML risky chars
};

const Paymentmanagement = () => {
  const [addSection, setAddSection] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    issue: "",
    amount: "",
  });
  const pdfRef = useRef();

  const [dataList, setDataList] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const handleSearch = (e) => {
    setSearchTerm(sanitizeInput(e.target.value));
  };

  const handleOnChange = (e) => {
    let { value, name } = e.target;

    if (name === "amount") {
      value = value.replace(/[^0-9.]/g, ""); // only numbers and dot
    } else {
      value = sanitizeInput(value);
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("/api/payment/expenseadd", formData);
      if (data.data.success) {
        setAddSection(false);
        alert(data.data.message);
        getFetchData();
        resetFormData();
      }
    } catch (error) {
      console.error("Error submitting expense:", error);
      alert("Something went wrong while adding expense.");
    }
  };

  const getFetchData = async () => {
    try {
      const data = await axios.get("/api/payment/getexpense");
      if (data.data.success) {
        setDataList(data.data.data);
        calculateTotalCost(data.data.data);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;

    try {
      const data = await axios.delete("api/payment/delete/" + encodeURIComponent(id));
      if (data.data.success) {
        getFetchData();
        alert(data.data.message);
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEdit = (el) => {
    // sanitize before setting
    setFormData({
      ...el,
      name: sanitizeInput(el.name),
      nic: sanitizeInput(el.nic),
      issue: sanitizeInput(el.issue),
      amount: sanitizeInput(String(el.amount)),
    });
    setEditSection(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put("api/payment/update", formData);
      if (data.data.success) {
        getFetchData();
        alert(data.data.message);
        setEditSection(false);
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const resetFormData = () => {
    setFormData({
      name: "",
      nic: "",
      issue: "",
      amount: "",
    });
  };

  useEffect(() => {
    getFetchData();
  }, []);

  // ✅ Safe PDF download
  const downloadPDF = () => {
    const input = pdfRef.current;
    if (!input) return;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save("invoice.pdf");
    });
  };

  const filteredDataList = dataList.filter(
    (item) =>
      sanitizeInput(item.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
      sanitizeInput(item.nic).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateTotalCost = (data) => {
    const total = data.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
    setTotalCost(total);
  };

  return (
    <>
      <Navbar3 />
      <div className="containersa">
        <h3>Additional Expenses</h3>
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
          Add Expenses
        </button>
        <section className="search">
          <input
            type="text"
            placeholder="Search by cost name or NIC"
            value={searchTerm}
            onChange={handleSearch}
          />
        </section>

        {addSection && (
          <FormTable
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleclose={() => setAddSection(false)}
            rest={formData}
          />
        )}

        {editSection && (
          <FormTable
            handleSubmit={handleUpdate}
            handleOnChange={handleOnChange}
            handleclose={() => setEditSection(false)}
            rest={formData}
          />
        )}

        <div className="tableContainer print-table" ref={pdfRef}>
          <table>
            <thead>
              <tr>
                <th>NIC</th>
                <th>Name</th>
                <th>Issue</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDataList.length > 0 ? (
                filteredDataList.map((el) => (
                  <tr key={el._id}>
                    <td>{sanitizeInput(el.nic)}</td>
                    <td>{sanitizeInput(el.name)}</td>
                    <td>{sanitizeInput(el.issue)}</td>
                    <td>{sanitizeInput(String(el.amount))}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEdit(el)}
                      >
                        Edit
                      </button>
                      <br />
                      <br />
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(el._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No data
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan="3" style={{ textAlign: "right" }}>
                  Total
                </td>
                <td>{totalCost}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
          <button className="report" onClick={downloadPDF}>
            Download Report
          </button>
        </div>
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
};

export default Paymentmanagement;

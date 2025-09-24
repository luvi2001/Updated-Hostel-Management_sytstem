import '../css/payment.css';
import {React, useEffect, useState ,useRef} from 'react';
import axios from "axios";
import FormTable from '../components/Formtable'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Navbar3 from "../components/Navbar3";
import Footer from '../components/Footer';


axios.defaults.baseURL = "http://localhost:8000/"

const Paymentmanagement=()=> {

  const [addSection,setAddSection] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [editSection,setEditSection] = useState(false)
  const [formData,setFormData] = useState({
    name:"",
    nic:"",
    issue:"",
    amount:"",
  })
  const pdfRef = useRef();




  const [dataList,setDataList] = useState([])
  const [totalCost, setTotalCost] = useState(0);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
};

  
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("/api/payment/expenseadd", formData);
      console.log(data);
      if (data.data.success) {
        setAddSection(false);
        alert(data.data.message);
        getFetchData();
        resetFormData();
      }
    } catch (error) {
      if (error.inner) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
      }
    }
  };

  const getFetchData = async () => {
    const data = await axios.get("/api/payment/getexpense");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
      calculateTotalCost(data.data.data);
    }
  };

  const handleDelete = async (id) => {
    const data = await axios.delete("api/payment/delete/" + id);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleEdit = (el) => {
    setFormData(el);
    setEditSection(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("api/payment/update", formData);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
      setEditSection(false);
    }
  };

  const resetFormData = ()=>{
    setFormData({
      name:"",
      nic:"",
      issue:"",
      amount:""
    })
  }


useEffect(()=>{
    getFetchData();
  },[]);


  //report generate
//   const ComponenetsRef = useRef();
//   const handlePrint = useReactToPrint({
//   content:()=>ComponenetsRef.current,
//   documentTitle:"UserReports",
//   onAfterPrint:()=>alert("User Report Sucessfully Downloaded !" )
  
//   });
  
// console.log(ComponenetsRef.current)

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



  //search filer
  const filteredDataList = dataList.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nic.toLowerCase().includes(searchTerm.toLowerCase())
);

  const calculateTotalCost = (data) => {
    const total = data.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    setTotalCost(total);
  };

  return (
  <>
    <Navbar3 />
    <div className = "containersa" >
      <h3>Additional Expenses</h3>
      <button className = "btn btn-add" onClick={()=>setAddSection(true)}>Add Expenses</button> 
      <section className="search">
                        <input
                            type="text"
                            placeholder="Search by cost name"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </section>
    
      {
        addSection && (

         <FormTable
         handleSubmit={handleSubmit}
         handleOnChange={handleOnChange}
         handleclose={() => setAddSection(false)}
         rest={formData}
         
         />
        )
      }

      { editSection && (
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
              filteredDataList.map((el) => {
                return (
                  <tr key={el._id}>
                    <td>{el.nic}</td>
                    <td>{el.name}</td>
                    <td>{el.issue}</td>
                    <td>{el.amount}</td>
                    <td>
                      <button className='btn btn-edit' onClick={() => handleEdit(el)
                      }>Edit</button><br/><br/>
                      <button className='btn btn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>No data</td>
              </tr>
            )}
            <tr>
              <td colSpan="3" style={{ textAlign: "right" }}>Total</td>
              <td>{totalCost}</td>
              <td></td>
            </tr>

          </tbody>
        </table>
          <br/><br/>
        <button className = "report" onClick={downloadPDF}>Download Report</button>
      </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
    <Footer/>
    </>
  );
 
}
export default Paymentmanagement;
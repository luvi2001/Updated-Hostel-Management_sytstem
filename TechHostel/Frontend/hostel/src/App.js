//import Register from'./pages/Register'
//import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Formyup from './pages/Formyup';
import Registerstudent from "./pages/Registerstudent";
import SearchStudent from "./pages/Searchstudent";
import Gatepasses from "./pages/Gatepasses";
import Allstudents from "./pages/Allstudents";
import StudentDetails from "./pages/StudentDetails";
import Loginpage from "./pages/Loginpage";
import Verfiygp from "./pages/Verfiygp";
import Secsearch from "./pages/Secsearch";

function App() {
  return (
    <div className="App">
      <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registerstudent />} />
          <Route path="/search" element={<SearchStudent />} />
          <Route path="/gp" element={<Gatepasses />} />
          <Route path="/allstudents" element={<Allstudents />} />
          <Route path="/student/:id" element={<StudentDetails />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/securityhome" element={<Verfiygp />} />
          <Route path="/securitysearch" element={<Secsearch />} />
        </Routes>
      </BrowserRouter>
    </>
    </div>
  );
}

export default App;

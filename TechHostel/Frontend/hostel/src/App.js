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
        </Routes>
      </BrowserRouter>
    </>
    </div>
  );
}

export default App;

//import Register from'./pages/Register'
//import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Formyup from './pages/Formyup';
import Registerstudent from "./pages/Registerstudent";
import SearchStudent from "./pages/Searchstudent";
import Gatepasses from "./pages/Gatepasses";

function App() {
  return (
    <div className="App">
      <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registerstudent />} />
          <Route path="/search" element={<SearchStudent />} />
          <Route path="/gp" element={<Gatepasses />} />
        </Routes>
      </BrowserRouter>
    </>
    </div>
  );
}

export default App;

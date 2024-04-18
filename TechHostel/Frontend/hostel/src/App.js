//import Register from'./pages/Register'
//import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Formyup from './pages/Formyup';
import Registerstudent from "./pages/Registerstudent";

function App() {
  return (
    <div className="App">
      <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registerstudent />} />
        </Routes>
      </BrowserRouter>
    </>
    </div>
  );
}

export default App;

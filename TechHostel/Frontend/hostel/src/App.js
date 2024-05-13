import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registerstudent from "./pages/Registerstudent";
import SearchStudent from "./pages/Searchstudent";
import Gatepasses from "./pages/Gatepasses";
import Allstudents from "./pages/Allstudents";
import StudentDetails from "./pages/StudentDetails";
import Loginpage from "./pages/Loginpage";
import Verfiygp from "./pages/Verfiygp";
import Secsearch from "./pages/Secsearch";
import Paymentmanagement from "./pages/Paymentmanagment";
import Sendmail from "./pages/Sendmail";
import Alltasks from "./pages/Alltasks";
import Mail from "./pages/Mail";
import Gettasks from "./pages/Gettasks";
import Studentlogin from "./pages/Studentlogin"
import Studentprof from "./pages/Studentprof";
import Applygatepass from "./pages/Applygatepass";
import PaymentVerification from "./pages/PaymentVerification"


function App() {
  return (
    <div className="App">
      <>

      
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Registerstudent />} />
          <Route path="/search" element={<SearchStudent />} />
          <Route path="/gp" element={<Gatepasses />} />
          <Route path="/allstudents" element={<Allstudents />} />
          <Route path="/student/:id" element={<StudentDetails />} />
          <Route path="/" element={<Loginpage />} />
          <Route path="/securityhome" element={<Verfiygp />} />
          <Route path="/securitysearch" element={<Secsearch />} />
          <Route path="/payment" element={<Paymentmanagement />} />
          <Route path="/assigntask" element={<Sendmail />} />
          <Route path="/tasksall" element={<Alltasks />} />
          <Route path="/mail" element={<Mail />} />
          <Route path="/gettasks" element={<Gettasks />} />
          <Route path="/stlog" element={<Studentlogin />} />
          <Route path="/getprof" element={<Studentprof  />}/>
          <Route path="/apgt" element={<Applygatepass  />}/>
          <Route path="/paymentform" element={<PaymentVerification  />}/>

        </Routes>
      </BrowserRouter>
    </>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CheckLoginStatus from "./CheckLoginStatus";
import { USER_ROLES } from "../constants/roles";

import {
  Home,
  Login,
  Signup,
  DoctorDashboard,
  HealthInfoListing,
  StudentDashboard,
} from "../pages";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Check Login Status */}
          <Route element={<CheckLoginStatus />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Common Private Routes */}
          <Route
            element={
              <PrivateRoute
                permissionLevel={[USER_ROLES.DOCTOR, USER_ROLES.STUDENT]}
              />
            }
          >
            <Route path="/health-info" element={<HealthInfoListing />} />
          </Route>

          {/* Doctor Private Routes */}
          <Route
            element={<PrivateRoute permissionLevel={[USER_ROLES.DOCTOR]} />}
          >
            <Route path="/doctor" element={<DoctorDashboard />} />
          </Route>

          {/* Student Private Routes */}
          <Route
            element={<PrivateRoute permissionLevel={[USER_ROLES.STUDENT]} />}
          >
            <Route path="/student" element={<StudentDashboard />} />
          </Route>

          {/* return 404 page */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;

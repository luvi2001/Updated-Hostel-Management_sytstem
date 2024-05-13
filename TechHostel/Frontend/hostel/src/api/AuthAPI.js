import api from "./api";

class AuthAPI {
  // User Login
  static login(credentials) {
    return api.post("/auth/login", credentials);
  }

  // Student Signup
  static studentSignup(values) {
    return api.post("/auth/student/signup", values);
  }

  // Doctor Signup
  static doctorSignup(values) {
    return api.post("/auth/doctor/signup", values);
  }
}

export default AuthAPI;

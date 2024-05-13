import api from "./api";

class UserAPI {
  // Get all students
  static getStudents() {
    return api.get("/api/users/students");
  }

  // Get all doctors
  static getDoctors() {
    return api.get("/api/users/doctors");
  }
}

export default UserAPI;

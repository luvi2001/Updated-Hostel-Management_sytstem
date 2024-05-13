import api from "./api";

class AppointmentAPI {
  // Create appointment
  static createAppointment(data) {
    return api.post("/api/appointments", data);
  }

  // Get all appointments
  static getAppointments() {
    return api.get("/api/appointments");
  }

  // Get appointment by id
  static getAppointmentById(id) {
    return api.get(`/api/appointments/${id}`);
  }

  // Update appointment
  static updateAppointment({ id, data }) {
    return api.patch(`/api/appointments/${id}`, data);
  }

  // Delete appointment
  static deleteAppointment(id) {
    return api.delete(`/api/appointments/${id}`);
  }

  // Get appointments count
  static getAppointmentsCount() {
    return api.get("/api/appointments/count");
  }

  // Get appointments by student
  static getAppointmentsByStudent() {
    return api.get("/api/appointments/student");
  }

  // Get appointments by doctor
  static getAppointmentsByDoctor() {
    return api.get("/api/appointments/doctor");
  }
}

export default AppointmentAPI;

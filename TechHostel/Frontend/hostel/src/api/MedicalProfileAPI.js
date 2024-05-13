import api from "./api";

class MedicalProfileAPI {
  // Create medicalProfile
  static createMedicalProfile(data) {
    return api.post("/api/medicalProfiles", data);
  }

  // Get all medicalProfiles
  static getMedicalProfiles() {
    return api.get("/api/medicalProfiles");
  }

  // Get medicalProfile by id
  static getMedicalProfileById(id) {
    return api.get(`/api/medicalProfiles/${id}`);
  }

  // Update medicalProfile
  static updateMedicalProfile({ id, data }) {
    return api.patch(`/api/medicalProfiles/${id}`, data);
  }

  // Delete medicalProfile
  static deleteMedicalProfile(id) {
    return api.delete(`/api/medicalProfiles/${id}`);
  }

  // Get medicalProfiles count
  static getMedicalProfilesCount() {
    return api.get("/api/medicalProfiles/count");
  }

  // Get medicalProfiles by student
  static getMedicalProfilesByStudent() {
    return api.get("/api/medicalProfiles/student");
  }

  // Create medicalRecord
  static createMedicalRecord({ id, data }) {
    return api.post(`/api/medicalProfiles/${id}/medical-records`, data);
  }

  // Get all medicalRecords
  static getMedicalRecords(id) {
    return api.get(`/api/medicalProfiles/${id}/medical-records`);
  }

  // Get medicalRecord by id
  static getMedicalRecordById({ id, recordId }) {
    return api.get(`/api/medicalProfiles/${id}/medical-records/${recordId}`);
  }

  // Update medicalRecord
  static updateMedicalRecord({ id, recordId, data }) {
    return api.patch(
      `/api/medicalProfiles/${id}/medical-records/${recordId}`,
      data
    );
  }

  // Delete medicalRecord
  static deleteMedicalRecord({ id, recordId }) {
    return api.delete(`/api/medicalProfiles/${id}/medical-records/${recordId}`);
  }
}

export default MedicalProfileAPI;

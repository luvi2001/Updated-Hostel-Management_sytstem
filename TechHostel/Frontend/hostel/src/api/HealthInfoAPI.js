import api from "./api";

class HealthInfoAPI {
  // Create healthInfo
  static createHealthInfo(data) {
    return api.post("/api/healthInfos", data);
  }

  // Get all healthInfos
  static getHealthInfos() {
    return api.get("/api/healthInfos");
  }

  // Get healthInfo by id
  static getHealthInfoById(id) {
    return api.get(`/api/healthInfos/${id}`);
  }

  // Update healthInfo
  static updateHealthInfo(values) {
    const { id, data } = values;
    return api.patch(`/api/healthInfos/${id}`, data);
  }

  // Delete healthInfo
  static deleteHealthInfo(id) {
    return api.delete(`/api/healthInfos/${id}`);
  }

  // Get healthInfos count
  static getHealthInfosCount() {
    return api.get("/api/healthInfos/count");
  }
}

export default HealthInfoAPI;

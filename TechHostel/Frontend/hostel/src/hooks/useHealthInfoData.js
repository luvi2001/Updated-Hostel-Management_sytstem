import { useQuery } from "@tanstack/react-query";
import HealthInfoAPI from "../api/HealthInfoAPI";

export const useHealthInfoData = () => {
  return useQuery(["healthInfos"], () => HealthInfoAPI.getHealthInfos());
};

export const useHealthInfoCount = () => {
  return useQuery(["healthInfoCount"], () => HealthInfoAPI.getHealthInfosCount());
};

export const useHealthInfo = (id) => {
  return useQuery(["healthInfo", id], () => HealthInfoAPI.getHealthInfoById(id));
};

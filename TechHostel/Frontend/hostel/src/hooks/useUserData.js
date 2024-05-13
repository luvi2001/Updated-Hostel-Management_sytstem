import { useQuery } from "@tanstack/react-query";
import UserAPI from "../api/UserAPI";

export const useStudentData = () => {
  return useQuery(["students"], () => UserAPI.getStudents());
};

export const useDoctorData = () => {
  return useQuery(["doctors"], () => UserAPI.getDoctors());
};

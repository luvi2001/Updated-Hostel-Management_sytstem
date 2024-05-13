import { useQuery } from "@tanstack/react-query";
import MedicalProfileAPI from "../api/MedicalProfileAPI";

export const useMedicalProfileData = () => {
  return useQuery(["medicalProfiles"], () =>
    MedicalProfileAPI.getMedicalProfiles()
  );
};

export const useMedicalProfileCount = () => {
  return useQuery(["medicalProfileCount"], () =>
    MedicalProfileAPI.getMedicalProfilesCount()
  );
};

export const useMedicalProfile = (id) => {
  return useQuery(["medicalProfile", id], () =>
    MedicalProfileAPI.getMedicalProfileById(id)
  );
};

export const useMedicalProfilesByStudent = () => {
  return useQuery(["medicalProfilesByStudent"], () =>
    MedicalProfileAPI.getMedicalProfilesByStudent()
  );
};

export const useMedicalRecords = (id) => {
  return useQuery(["medicalRecords", id], () =>
    MedicalProfileAPI.getMedicalRecords(id)
  );
};

export const useMedicalRecord = ({ id, recordId }) => {
  return useQuery(["medicalRecord", id, recordId], () =>
    MedicalProfileAPI.getMedicalRecordById({ id, recordId })
  );
};

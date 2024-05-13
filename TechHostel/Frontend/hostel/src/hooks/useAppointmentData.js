import { useQuery } from "@tanstack/react-query";
import AppointmentAPI from "../api/AppointmentAPI";

export const useAppointmentData = () => {
  return useQuery(["appointments"], () => AppointmentAPI.getAppointments());
};

export const useAppointmentCount = () => {
  return useQuery(["appointmentCount"], () =>
    AppointmentAPI.getAppointmentsCount()
  );
};

export const useAppointment = (id) => {
  return useQuery(["appointment", id], () =>
    AppointmentAPI.getAppointmentById(id)
  );
};

export const useAppointmentsByStudent = () => {
  return useQuery(["appointmentsByStudent"], () =>
    AppointmentAPI.getAppointmentsByStudent()
  );
};

export const useAppointmentsByDoctor = () => {
  return useQuery(["appointmentsByDoctor"], () =>
    AppointmentAPI.getAppointmentsByDoctor()
  );
};

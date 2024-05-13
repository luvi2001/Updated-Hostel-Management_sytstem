import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAppointmentStore } from "../../store/useAppointmentStore";
import {
  useAppointmentsByDoctor,
  useAppointmentsByStudent,
} from "../../hooks/useAppointmentData";
import { BootstrapModal } from "../../components";
import Toast from "../../utils/toast";
import AppointmentAPI from "../../api/AppointmentAPI";
import { useAuthStore } from "../../store/useAuthStore";
import { USER_ROLES } from "../../constants/roles";

const EditAppointmentModal = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  // Get the state and actions from the store
  const {
    isEditAppointmentModalOpen,
    closeEditAppointmentModal,
    selectedAppointment,
  } = useAppointmentStore((state) => ({
    isEditAppointmentModalOpen: state.isEditAppointmentModalOpen,
    closeEditAppointmentModal: state.closeEditAppointmentModal,
    selectedAppointment: state.selectedAppointment,
  }));

  // Get the data from the react-query hook
  let results;
  if (user.role === USER_ROLES.DOCTOR) {
    results = useAppointmentsByDoctor();
  } else {
    results = useAppointmentsByStudent();
  }
  const { refetch } = results;

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Update mutation
  const { mutate } = useMutation(AppointmentAPI.updateAppointment, {
    onSuccess: () => {
      // close the modal and refetch the data
      refetch();
      closeEditAppointmentModal();
      Toast({ type: "success", message: "Appointment updated successfully" });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    mutate({ id: selectedAppointment._id, data });
  };

  useEffect(() => {
    // Set the form values when the selectedAppointment changes
    if (selectedAppointment) {
      setValue("description", selectedAppointment.description);
      if (user.role === USER_ROLES.DOCTOR) {
        setValue("status", selectedAppointment.status);
        setValue("appointmentDate", selectedAppointment.appointmentDate);
        setValue("appointmentTime", selectedAppointment.appointmentTime);
      }
    }
  }, [selectedAppointment, setValue]);

  return (
    <BootstrapModal
      show={isEditAppointmentModalOpen}
      handleClose={closeEditAppointmentModal}
      title={`Update: ${selectedAppointment?.doctor.name} appointment`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && (
            <small className="form-text text-danger">
              Description is required
            </small>
          )}
        </div>

        {/* if user is a doctor, show the status dropdown */}
        {user.role === USER_ROLES.DOCTOR && (
          <>
            <div className="mb-2">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                className="form-control"
                id="status"
                name="status"
                {...register("status", { required: true })}
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
              {errors.status && (
                <small className="form-text text-danger">
                  Status is required
                </small>
              )}
            </div>

            <div className="mb-2">
              <label htmlFor="appointmentDate" className="form-label">
                Appointment Date
              </label>
              <input
                type="date"
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                {...register("appointmentDate", { required: true })}
              />
              {errors.appointmentDate && (
                <small className="form-text text-danger">
                  Appointment Date is required
                </small>
              )}
            </div>

            <div className="mb-2">
              <label htmlFor="appointmentTime" className="form-label">
                Appointment Time
              </label>
              <input
                type="time"
                className="form-control"
                id="appointmentTime"
                name="appointmentTime"
                {...register("appointmentTime", { required: true })}
              />
              {errors.appointmentTime && (
                <small className="form-text text-danger">
                  Appointment Time is required
                </small>
              )}
            </div>
          </>
        )}

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditAppointmentModal;

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAppointmentStore } from "../../store/useAppointmentStore";
import {
  useAppointmentData,
  useAppointmentsByDoctor,
  useAppointmentsByStudent,
} from "../../hooks/useAppointmentData";
import { BootstrapModal } from "../../components";
import AppointmentAPI from "../../api/AppointmentAPI";
import Toast from "../../utils/toast";
import { useDoctorData } from "../../hooks/useUserData";
import { useAuthStore } from "../../store/useAuthStore";
import { USER_ROLES } from "../../constants/roles";

const AddAppointmentModal = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  // Get the state and actions from the store
  const { isAddAppointmentModalOpen, closeAddAppointmentModal } =
    useAppointmentStore((state) => ({
      isAddAppointmentModalOpen: state.isAddAppointmentModalOpen,
      closeAddAppointmentModal: state.closeAddAppointmentModal,
    }));

  // Get the data from the react-query hook
  let results;
  if (user.role === USER_ROLES.DOCTOR) {
    results = useAppointmentsByDoctor();
  } else {
    results = useAppointmentsByStudent();
  }
  const { refetch } = results;

  const { data: doctors } = useDoctorData();

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Create mutation
  const { mutate } = useMutation(AppointmentAPI.createAppointment, {
    onSuccess: () => {
      // close the modal and refetch the data
      closeAddAppointmentModal();
      refetch();
      Toast({ type: "success", message: "Appointment created successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error.message });
    },
  });

  // Submit function
  const onSubmit = (values) => {
    mutate(values);
    reset();
  };

  return (
    <BootstrapModal
      show={isAddAppointmentModalOpen}
      handleClose={closeAddAppointmentModal}
      title="Make an Appointment"
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {/* Doctors dropdown */}
        <div className="form-group">
          <label className="my-2" htmlFor="doctor">
            Doctor
          </label>
          <select
            className="form-control"
            id="doctor"
            name="doctor"
            {...register("doctor", { required: true })}
          >
            {doctors?.data?.doctors?.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name} - {doctor.specialty}
              </option>
            ))}
          </select>
          {errors.doctor && (
            <small className="form-text text-danger">Doctor is required</small>
          )}
        </div>

        <div className="form-group">
          <label className="my-2" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <small className="form-text text-danger">
              Description is required
            </small>
          )}
        </div>

        <div className="form-group">
          <label className="my-2" htmlFor="appointmentDate">
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

        <div className="form-group">
          <label className="my-2" htmlFor="appointmentTime">
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

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </BootstrapModal>
  );
};

export default AddAppointmentModal;

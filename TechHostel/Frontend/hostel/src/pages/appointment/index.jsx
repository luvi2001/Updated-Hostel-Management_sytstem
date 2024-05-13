import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { useAppointmentStore } from "../../store/useAppointmentStore";
import {
  useAppointmentsByDoctor,
  useAppointmentsByStudent,
} from "../../hooks/useAppointmentData";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import AppointmentAPI from "../../api/AppointmentAPI";
import { BootstrapTable } from "../../components";
import { generatePDF } from "../../utils/GeneratePDF";
import { IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useAuthStore } from "../../store/useAuthStore";
import { USER_ROLES } from "../../constants/roles";

import AddAppointmentModal from "./AddAppointmentModal";
import EditAppointmentModal from "./EditAppointmentModal";

const index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  // Get the state and actions from the store
  const {
    openAddAppointmentModal,
    openEditAppointmentModal,
    setSelectedAppointment,
  } = useAppointmentStore((state) => ({
    openAddAppointmentModal: state.openAddAppointmentModal,
    openEditAppointmentModal: state.openEditAppointmentModal,
    setSelectedAppointment: state.setSelectedAppointment,
  }));

  // Get the data from the react-query hook
  let results;
  if (user.role === USER_ROLES.DOCTOR) {
    results = useAppointmentsByDoctor();
  } else {
    results = useAppointmentsByStudent();
  }
  const { data, refetch } = results;

  // Delete mutation
  const { mutate } = useMutation(AppointmentAPI.deleteAppointment, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "Appointment deleted successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  // Delete function
  const onDelete = (id) => {
    confirmMessage("Are you sure?", "This action cannot be undone.", () => {
      mutate(id);
    });
  };

  // Edit function
  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    openEditAppointmentModal();
  };

  // PDF report function
  const downloadPDF = () => {
    const appointmentCount = data.data.appointments.length;
    //
    const appointmentData = data.data.appointments.map((appointment) => ({
      doctor: appointment.doctor.name,
      description: appointment.description,
      status: appointment.status,
      venue: `${appointment.appointmentDate} - ${appointment.appointmentTime}`,
    }));
    //
    const additionalInfo = `Total Appointments: ${appointmentCount}`;
    //
    generatePDF(
      additionalInfo,
      ["doctor", "description", "status", "venue"],
      appointmentData,
      "appointments-report"
    );
  };

  const doctorColumns = [
    "Student",
    "Description",
    "Status",
    "Venue",
    "Actions",
  ];
  const studentColumns = [
    "Doctor",
    "Description",
    "Status",
    "Venue",
    "Actions",
  ];

  return (
    <div className="container mt-2">
      <AddAppointmentModal />
      <EditAppointmentModal />

      <h1 className="mb-4">Appointments</h1>

      {user.role === USER_ROLES.STUDENT && (
        <Button
          variant="primary"
          className="m-1"
          onClick={openAddAppointmentModal}
        >
          <IoMdAddCircleOutline className="mb-1" />{" "}
          <span>Make an Appointment</span>
        </Button>
      )}

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      <div className="mt-5">
        <BootstrapTable
          headers={
            user.role === USER_ROLES.DOCTOR ? doctorColumns : studentColumns
          }
          children={
            data &&
            data.data.appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>
                  {user.role === USER_ROLES.DOCTOR
                    ? appointment.student.name
                    : appointment.doctor.name}
                </td>
                <td>{appointment.description}</td>
                <td>
                  <span
                    // ["Pending", "Approved", "Rejected"]
                    className={`badge ${
                      appointment.status === "Pending"
                        ? "bg-warning"
                        : appointment.status === "Approved"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>
                <td>
                  {appointment.appointmentDate} - {appointment.appointmentTime}
                </td>
                <td className="d-flex">
                  <Button
                    className="mx-1 px-2"
                    variant="info"
                    onClick={() => handleEdit(appointment)}
                    size="sm"
                  >
                    <MdEditSquare className="mb-1 mx-1" />
                  </Button>
                  <Button
                    className="mx-1 px-2 d-flex align-items-center"
                    variant="danger"
                    onClick={() => onDelete(appointment._id)}
                    size="sm"
                  >
                    <AiTwotoneDelete className="mb-1 mx-1" />
                  </Button>
                </td>
              </tr>
            ))
          }
        />
      </div>
    </div>
  );
};

export default index;

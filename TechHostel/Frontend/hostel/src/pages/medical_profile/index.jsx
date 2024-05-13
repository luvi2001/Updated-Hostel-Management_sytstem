import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { useMedicalProfileStore } from "../store/useMedicalProfileStore";
import { useMedicalProfileData } from "../hooks/useMedicalProfileData";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import MedicalProfileAPI from "../../api/MedicalProfileAPI";
import { BootstrapTable } from "../../components";
import { generatePDF } from "../../utils/GeneratePDF";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";

import AddMedicalProfileModal from "./AddMedicalProfileModal";
import EditMedicalProfileModal from "./EditMedicalProfileModal";
import ViewMedicalProfileModal from "./ViewMedicalProfileModal";

import AddMedicalRecordModal from "./AddMedicalRecordModal";
import EditMedicalRecordModal from "./EditMedicalRecordModal";
import ViewMedicalRecordModal from "./ViewMedicalRecordModal";

const index = () => {
  // Get the state and actions from the store
  const {
    openAddMedicalProfileModal,
    openEditMedicalProfileModal,
    openViewMedicalProfileModal,
    setSelectedMedicalProfile,
  } = useMedicalProfileStore((state) => ({
    openAddMedicalProfileModal: state.openAddMedicalProfileModal,
    openEditMedicalProfileModal: state.openEditMedicalProfileModal,
    openViewMedicalProfileModal: state.openViewMedicalProfileModal,
    setSelectedMedicalProfile: state.setSelectedMedicalProfile,
  }));

  // Get the data from the react-query hook
  const { data, refetch } = useMedicalProfileData();
  const [searchTerm, setSearchTerm] = useState("");

  // Delete mutation
  const { mutate } = useMutation(MedicalProfileAPI.deleteMedicalProfile, {
    onSuccess: () => {
      refetch();
      Toast({
        type: "success",
        message: "Medical Profile deleted successfully",
      });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  // Delete function
  const onDelete = (id) => {
    // warn this will delete all the medical records too
    confirmMessage(
      "Are you sure?",
      "It will delete all the medical records too. This action cannot be undone.",
      () => {
        mutate(id);
      }
    );
  };

  // Edit function
  const handleEdit = (medicalProfile) => {
    setSelectedMedicalProfile(medicalProfile);
    openEditMedicalProfileModal();
  };

  const downloadPDF = (studentId) => {
    const medicalProfile = data.data.medicalProfiles.find(
      (profile) => profile.student._id === studentId
    );

    if (!medicalProfile) {
      console.error("Medical profile not found for the given student ID.");
      return;
    }

    // Prepare the data for PDF generation
    const medicalRecordsData = medicalProfile.medicalRecords.map((record) => ({
      condition: record.condition,
      diagnosisDate: record.diagnosisDate,
      treatment: record.treatment,
    }));

    const additionalInfo = `Medical Records for ${medicalProfile.student.name}`;

    // Generate PDF
    generatePDF(
      additionalInfo,
      ["condition", "diagnosisDate", "treatment"],
      medicalRecordsData,
      `Medical-Records-for-${medicalProfile.student.name.replace(/\s+/g, "-")}`
    );
  };

  // Filter the displayed data based on the search term
  const filteredData = data?.data.medicalProfiles.filter((profile) =>
    profile.student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-2">
      <AddMedicalProfileModal />
      <EditMedicalProfileModal />
      <ViewMedicalProfileModal />

      <AddMedicalRecordModal />
      <EditMedicalRecordModal />
      <ViewMedicalRecordModal />

      <h1 className="mb-4">Medical Profiles</h1>

      <div className="d-flex justify-content-between align-items-center">
        <Button
          variant="primary"
          className="d-flex align-items-center"
          onClick={openAddMedicalProfileModal}
        >
          {/* <IoMdAddCircleOutline className="mb-1 mt-1" /> */}
          <span className="">Create</span>
        </Button>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by student name..."
          className="form-control d-inline-block"
          style={{ marginLeft: "20px" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mt-5">
        <BootstrapTable
          headers={[
            "Student",
            "Allergies",
            "Medications",
            "Blood Type",
            "Height",
            "Weight",
            "Actions",
          ]}
          children={
            filteredData &&
            filteredData.map((medicalProfile) => (
              <tr key={medicalProfile._id}>
                <td>{medicalProfile.student.name}</td>
                <td>{medicalProfile.allergies || "None"}</td>
                <td>{medicalProfile.medications || "None"}</td>
                <td>{medicalProfile.bloodType}</td>
                <td>{medicalProfile.height}</td>
                <td>{medicalProfile.weight}</td>
                <td className="d-flex justify-content-center align-items-center">
                  {/* View Details Button */}
                  <Button
                    className="mx-1 px-2 d-flex align-items-center"
                    variant="primary" // Blue color for informational actions
                    onClick={() => {
                      setSelectedMedicalProfile(medicalProfile);
                      openViewMedicalProfileModal();
                    }}
                    size="sm"
                    title="View Details"
                  >
                    <FaInfoCircle className="my-1 mx-1" />
                  </Button>

                  {/* Edit Button */}
                  <Button
                    className="mx-1 px-2 d-flex align-items-center"
                    variant="warning" // Yellow or orange for actions requiring attention/caution
                    onClick={() => handleEdit(medicalProfile)}
                    size="sm"
                    title="Edit"
                  >
                    <MdEditSquare className="my-1 mx-1" />
                  </Button>

                  {/* Download PDF Button */}
                  <Button
                    className="mx-1 px-2 d-flex align-items-center"
                    variant="secondary" // Grey or another neutral color for secondary actions
                    onClick={() => downloadPDF(medicalProfile.student._id)}
                    size="sm"
                    title="Download PDF"
                    disabled={!medicalProfile.medicalRecords.length}
                  >
                    <IoMdDownload className="my-1 mx-1" />
                  </Button>

                  {/* Delete Button */}
                  <Button
                    className="mx-1 px-2 d-flex align-items-center"
                    variant="danger" // Red color for destructive actions
                    onClick={() => onDelete(medicalProfile._id)}
                    size="sm"
                    title="Delete"
                  >
                    <AiTwotoneDelete className="my-1 mx-1" />
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

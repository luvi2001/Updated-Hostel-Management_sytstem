import { useMedicalProfileStore } from "../../store/useMedicalProfileStore";
import { BootstrapModal } from "../../components";
import Button from "react-bootstrap/Button";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BootstrapTable } from "../../components";
import MedicalProfileAPI from "../../api/MedicalProfileAPI";
import { useMutation } from "@tanstack/react-query";
import Toast from "../../utils/toast";
import { confirmMessage } from "../../utils/Alert";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { useMedicalProfileData } from "../../hooks/useMedicalProfileData";

const ViewMedicalRecordModal = () => {
  // Get the state and actions from the store
  const {
    isViewMedicalRecordModalOpen,
    closeViewMedicalRecordModal,
    medicalRecords,
    setSelectedMedicalRecord,
    openEditMedicalRecordModal,
    openAddMedicalRecordModal,

    closeViewMedicalProfileModal,
    selectedMedicalProfile,
  } = useMedicalProfileStore((state) => ({
    isViewMedicalRecordModalOpen: state.isViewMedicalRecordModalOpen,
    closeViewMedicalRecordModal: state.closeViewMedicalRecordModal,
    medicalRecords: state.medicalRecords,
    setSelectedMedicalRecord: state.setSelectedMedicalRecord,
    openEditMedicalRecordModal: state.openEditMedicalRecordModal,
    openAddMedicalRecordModal: state.openAddMedicalRecordModal,

    closeViewMedicalProfileModal: state.closeViewMedicalProfileModal,
    selectedMedicalProfile: state.selectedMedicalProfile,
  }));

  // Refetch function
  const { refetch } = useMedicalProfileData();

  // Delete mutation
  const { mutate } = useMutation(MedicalProfileAPI.deleteMedicalRecord, {
    onSuccess: () => {
      refetch();
      Toast({
        type: "success",
        message: "Medical Record deleted successfully",
      });
      closeViewMedicalRecordModal();
      closeViewMedicalProfileModal();
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  // Delete function
  const onDelete = (id) => {
    // warn this will delete all the medical records too
    confirmMessage("Are you sure?", "This action cannot be undone.", () => {
      mutate({ id: selectedMedicalProfile._id, recordId: id });
    });
  };

  // Edit function
  const handleEdit = (medicalRecord) => {
    setSelectedMedicalRecord(medicalRecord);
    openEditMedicalRecordModal();
    closeViewMedicalRecordModal();
    closeViewMedicalProfileModal();
  };

  return (
    <BootstrapModal
      size={"xl"}
      show={isViewMedicalRecordModalOpen}
      handleClose={closeViewMedicalRecordModal}
      title={`${selectedMedicalProfile?.student?.name}'s Medical Records`}
    >
      <Button
        variant="primary"
        className="d-flex align-items-center mb-3"
        onClick={() => {
          openAddMedicalRecordModal();
          closeViewMedicalRecordModal();
          closeViewMedicalProfileModal();
        }}
      >
        <IoMdAddCircleOutline className="mb-1 mt-1" />
        <span className="ms-2">Add Medical Record</span>
      </Button>

      <BootstrapTable
        headers={["Condition", "Diagnosis Date", "Treatment", "Actions"]}
        children={
          medicalRecords &&
          medicalRecords.map((record) => (
            <tr key={record._id}>
              <td>{record.condition}</td>
              <td>{record.diagnosisDate}</td>
              <td>{record.treatment}</td>
              <td className="d-flex justify-content-center">
                {/* Edit Button */}
                <Button
                  className="mx-1 px-2 d-flex align-items-center"
                  variant="warning" // Yellow or orange for actions requiring attention/caution
                  onClick={() => handleEdit(record)}
                  size="sm"
                  title="Edit"
                >
                  <MdEditSquare className="my-1 mx-1" />
                </Button>
                {/* Delete Button */}
                <Button
                  className="mx-1 px-2 d-flex align-items-center"
                  variant="danger" // Red for actions that are destructive
                  onClick={() => onDelete(record._id)}
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

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={() => {
            closeViewMedicalRecordModal();
            closeViewMedicalProfileModal();
          }}
        >
          Close
        </button>
      </div>
    </BootstrapModal>
  );
};

export default ViewMedicalRecordModal;

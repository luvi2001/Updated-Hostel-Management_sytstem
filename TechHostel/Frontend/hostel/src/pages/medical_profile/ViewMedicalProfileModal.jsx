import { useMedicalProfileStore } from "../../store/useMedicalProfileStore";
import { BootstrapModal } from "../../components";

const ViewMedicalProfileModal = () => {
  // Get the state and actions from the store
  const {
    isViewMedicalProfileModalOpen,
    closeViewMedicalProfileModal,
    selectedMedicalProfile,

    openViewMedicalRecordModal,
    setMedicalRecords,
  } = useMedicalProfileStore((state) => ({
    isViewMedicalProfileModalOpen: state.isViewMedicalProfileModalOpen,
    closeViewMedicalProfileModal: state.closeViewMedicalProfileModal,
    selectedMedicalProfile: state.selectedMedicalProfile,

    openViewMedicalRecordModal: state.openViewMedicalRecordModal,
    setMedicalRecords: state.setMedicalRecords,
  }));

  return (
    <BootstrapModal
      show={isViewMedicalProfileModalOpen}
      handleClose={closeViewMedicalProfileModal}
      title={`${selectedMedicalProfile?.student?.name}'s Medical Profile`}
    >
      <div>
        <p>
          <strong>Allergies:</strong> {selectedMedicalProfile?.allergies}
        </p>
        <p>
          <strong>Medications:</strong> {selectedMedicalProfile?.medications}
        </p>
        <p>
          <strong>Blood Type:</strong> {selectedMedicalProfile?.bloodType}
        </p>
        <p>
          <strong>Height:</strong> {selectedMedicalProfile?.height}
        </p>
        <p>
          <strong>Weight:</strong> {selectedMedicalProfile?.weight}
        </p>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          onClick={() => {
            setMedicalRecords(selectedMedicalProfile?.medicalRecords);
            openViewMedicalRecordModal();
            closeViewMedicalProfileModal();
          }}
        >
          View Medical Records
        </button>
        <button
          className="btn btn-secondary"
          onClick={closeViewMedicalProfileModal}
        >
          Close
        </button>
      </div>
    </BootstrapModal>
  );
};

export default ViewMedicalProfileModal;

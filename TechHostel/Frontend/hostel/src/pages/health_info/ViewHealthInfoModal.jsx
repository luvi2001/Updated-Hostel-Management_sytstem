import { useHealthInfoStore } from "../../store/useHealthInfoStore";
import { BootstrapModal } from "../../components";

const ViewHealthInfoModal = () => {
  // Get the state and actions from the store
  const {
    isViewHealthInfoModalOpen,
    closeViewHealthInfoModal,
    selectedHealthInfo,
  } = useHealthInfoStore((state) => ({
    isViewHealthInfoModalOpen: state.isViewHealthInfoModalOpen,
    closeViewHealthInfoModal: state.closeViewHealthInfoModal,
    selectedHealthInfo: state.selectedHealthInfo,
  }));

  return (
    <BootstrapModal
      show={isViewHealthInfoModalOpen}
      handleClose={closeViewHealthInfoModal}
      title={selectedHealthInfo?.title}
    >
      <div>
        <p>
          <strong>Description:</strong> {selectedHealthInfo?.description}
        </p>
        <p>
          <strong>Category:</strong> {selectedHealthInfo?.category}
        </p>
        <p>
          <strong>Author:</strong> {selectedHealthInfo?.author?.name}
        </p>
      </div>

      <div className="d-flex justify-content-end">
        <button
          className="btn btn-secondary"
          onClick={closeViewHealthInfoModal}
        >
          Close
        </button>
      </div>
    </BootstrapModal>
  );
};

export default ViewHealthInfoModal;

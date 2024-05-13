import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useMedicalProfileStore } from "../../store/useMedicalProfileStore";
import { useMedicalProfileData } from "../../hooks/useMedicalProfileData";
import { BootstrapModal } from "../../components";
import MedicalProfileAPI from "../../api/MedicalProfileAPI";
import Toast from "../../utils/toast";

const AddMedicalRecordModal = () => {
  // Get the state and actions from the store
  const {
    isAddMedicalRecordModalOpen,
    closeAddMedicalRecordModal,

    selectedMedicalProfile,
  } = useMedicalProfileStore((state) => ({
    isAddMedicalRecordModalOpen: state.isAddMedicalRecordModalOpen,
    closeAddMedicalRecordModal: state.closeAddMedicalRecordModal,

    selectedMedicalProfile: state.selectedMedicalProfile,
  }));

  // Get refetch function from react-query hook
  const { refetch } = useMedicalProfileData();

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Create mutation
  const { mutate } = useMutation(MedicalProfileAPI.createMedicalRecord, {
    onSuccess: () => {
      closeAddMedicalRecordModal();
      // close the modal and refetch the data
      refetch();
      Toast({
        type: "success",
        message: "Medical Record added successfully",
      });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  // Submit function
  const onSubmit = (values) => {
    mutate({ id: selectedMedicalProfile._id, data: values });
    reset();
  };

  return (
    <BootstrapModal
      show={isAddMedicalRecordModalOpen}
      handleClose={closeAddMedicalRecordModal}
      title={`Add Medical Record for ${selectedMedicalProfile?.student?.name}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="form-group">
          <label className="my-2" htmlFor="condition">
            Condition
          </label>
          <input
            type="text"
            className="form-control"
            id="condition"
            name="condition"
            {...register("condition")}
          />
          {errors.condition && (
            <small className="form-text text-danger">
              Enter valid input for condition
            </small>
          )}
        </div>

        <div className="form-group">
          <label className="my-2" htmlFor="diagnosisDate">
            Diagnosis Date
          </label>
          <input
            type="date"
            className="form-control"
            id="diagnosisDate"
            name="diagnosisDate"
            {...register("diagnosisDate")}
          />
          {errors.diagnosisDate && (
            <small className="form-text text-danger">
              Enter valid input for diagnosisDate
            </small>
          )}
        </div>

        <div className="form-group">
          <label className="my-2" htmlFor="treatment">
            Treatment
          </label>
          <input
            type="text"
            className="form-control"
            id="treatment"
            name="treatment"
            {...register("treatment")}
          />
          {errors.treatment && (
            <small className="form-text text-danger">
              Enter valid input for treatment
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

export default AddMedicalRecordModal;

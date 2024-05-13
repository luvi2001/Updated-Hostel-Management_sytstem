import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useMedicalProfileStore } from "../../store/useMedicalProfileStore";
import { useMedicalProfileData } from "../../hooks/useMedicalProfileData";
import { BootstrapModal } from "../../components";
import Toast from "../../utils/toast";
import MedicalProfileAPI from "../../api/MedicalProfileAPI";

const EditMedicalProfileModal = () => {
  // Get the state and actions from the store
  const {
    isEditMedicalRecordModalOpen,
    closeEditMedicalRecordModal,
    selectedMedicalRecord,

    selectedMedicalProfile,
  } = useMedicalProfileStore((state) => ({
    isEditMedicalRecordModalOpen: state.isEditMedicalRecordModalOpen,
    closeEditMedicalRecordModal: state.closeEditMedicalRecordModal,
    selectedMedicalRecord: state.selectedMedicalRecord,

    selectedMedicalProfile: state.selectedMedicalProfile,
  }));

  // Get refetch function from react-query hook
  const { refetch } = useMedicalProfileData();

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Update mutation
  const { mutate } = useMutation(MedicalProfileAPI.updateMedicalRecord, {
    onSuccess: () => {
      // close the modal and refetch the data
      refetch();
      closeEditMedicalRecordModal();
      Toast({
        type: "success",
        message: "Medical Record updated successfully",
      });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    mutate({
      id: selectedMedicalProfile._id,
      recordId: selectedMedicalRecord._id,
      data,
    });
  };

  useEffect(() => {
    // Set the form values when the selectedMedicalProfile changes
    if (selectedMedicalRecord) {
      setValue("condition", selectedMedicalRecord.condition);
      setValue("diagnosisDate", selectedMedicalRecord.diagnosisDate);
      setValue("treatment", selectedMedicalRecord.treatment);
    }
  }, [selectedMedicalRecord, setValue]);

  return (
    <BootstrapModal
      show={isEditMedicalRecordModalOpen}
      handleClose={closeEditMedicalRecordModal}
      title={`Edit: ${selectedMedicalProfile?.student?.name}'s Medical Profile`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label htmlFor="condition" className="form-label">
            Condition
          </label>
          <input
            type="text"
            className="form-control"
            id="condition"
            name="condition"
            {...register("condition", { required: true })}
          />
          {errors.condition && (
            <small className="form-text text-danger">
              Condition is required
            </small>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="diagnosisDate" className="form-label">
            Diagnosis Date
          </label>
          <input
            type="date"
            className="form-control"
            id="diagnosisDate"
            name="diagnosisDate"
            {...register("diagnosisDate", { required: true })}
          />
          {errors.diagnosisDate && (
            <small className="form-text text-danger">
              Diagnosis Date is required
            </small>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="treatment" className="form-label">
            Treatment
          </label>
          <input
            type="text"
            className="form-control"
            id="treatment"
            name="treatment"
            {...register("treatment", { required: true })}
          />
          {errors.treatment && (
            <small className="form-text text-danger">
              Treatment is required
            </small>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditMedicalProfileModal;

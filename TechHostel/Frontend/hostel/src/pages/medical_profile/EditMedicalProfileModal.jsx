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
    isEditMedicalProfileModalOpen,
    closeEditMedicalProfileModal,
    selectedMedicalProfile,
  } = useMedicalProfileStore((state) => ({
    isEditMedicalProfileModalOpen: state.isEditMedicalProfileModalOpen,
    closeEditMedicalProfileModal: state.closeEditMedicalProfileModal,
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
  const { mutate } = useMutation(MedicalProfileAPI.updateMedicalProfile, {
    onSuccess: () => {
      // close the modal and refetch the data
      refetch();
      closeEditMedicalProfileModal();
      Toast({
        type: "success",
        message: "Medical Profile updated successfully",
      });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    mutate({ id: selectedMedicalProfile._id, data });
  };

  useEffect(() => {
    // Set the form values when the selectedMedicalProfile changes
    if (selectedMedicalProfile) {
      setValue("allergies", selectedMedicalProfile.allergies);
      setValue("medications", selectedMedicalProfile.medications);
      setValue("bloodType", selectedMedicalProfile.bloodType);
      setValue("height", selectedMedicalProfile.height);
      setValue("weight", selectedMedicalProfile.weight);
    }
  }, [selectedMedicalProfile, setValue]);

  return (
    <BootstrapModal
      show={isEditMedicalProfileModalOpen}
      handleClose={closeEditMedicalProfileModal}
      title={`Edit: ${selectedMedicalProfile?.student?.name}'s Medical Profile`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label htmlFor="allergies" className="form-label">
            Allergies (if any)
          </label>
          <input
            type="text"
            className="form-control"
            id="allergies"
            name="allergies"
            {...register("allergies")}
          />
          {errors.allergies && (
            <small className="form-text text-danger">
              Allergies is required
            </small>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="medications" className="form-label">
            Medications (if any)
          </label>
          <input
            type="text"
            className="form-control"
            id="medications"
            name="medications"
            {...register("medications")}
          />
          {errors.medications && (
            <small className="form-text text-danger">
              Medications is required
            </small>
          )}
        </div>

        {/* dropdown for blood type */}
        <div className="mb-2">
          <label htmlFor="bloodType" className="form-label">
            Blood Type
          </label>
          <select
            className="form-control"
            id="bloodType"
            name="bloodType"
            {...register("bloodType", { required: true })}
          >
            <option value="">Select blood type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          {errors.bloodType && (
            <small className="form-text text-danger">
              Blood Type is required
            </small>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="height" className="form-label">
            Height
          </label>
          <input
            type="number"
            className="form-control"
            id="height"
            name="height"
            {...register("height", { required: true })}
          />
          {errors.height && (
            <small className="form-text text-danger">Height is required</small>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="weight" className="form-label">
            Weight
          </label>
          <input
            type="number"
            className="form-control"
            id="weight"
            name="weight"
            {...register("weight", { required: true })}
          />
          {errors.weight && (
            <small className="form-text text-danger">Weight is required</small>
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

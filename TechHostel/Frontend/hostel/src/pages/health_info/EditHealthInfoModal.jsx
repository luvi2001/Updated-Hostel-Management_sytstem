import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useHealthInfoStore } from "../../store/useHealthInfoStore";
import { useHealthInfoData } from "../../hooks/useHealthInfoData";
import { BootstrapModal } from "../../components";
import Toast from "../../utils/toast";
import HealthInfoAPI from "../../api/HealthInfoAPI";

const EditHealthInfoModal = () => {
  // Get the state and actions from the store
  const {
    isEditHealthInfoModalOpen,
    closeEditHealthInfoModal,
    selectedHealthInfo,
  } = useHealthInfoStore((state) => ({
    isEditHealthInfoModalOpen: state.isEditHealthInfoModalOpen,
    closeEditHealthInfoModal: state.closeEditHealthInfoModal,
    selectedHealthInfo: state.selectedHealthInfo,
  }));

  // Get refetch function from react-query hook
  const { refetch } = useHealthInfoData();

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Update mutation
  const { mutate } = useMutation(HealthInfoAPI.updateHealthInfo, {
    onSuccess: () => {
      // close the modal and refetch the data
      refetch();
      closeEditHealthInfoModal();
      Toast({ type: "success", message: "HealthInfo updated successfully" });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    mutate({ id: selectedHealthInfo._id, data });
  };

  useEffect(() => {
    // Set the form values when the selectedHealthInfo changes
    if (selectedHealthInfo) {
      setValue("title", selectedHealthInfo.title);
      setValue("description", selectedHealthInfo.description);
      setValue("category", selectedHealthInfo.category);
    }
  }, [selectedHealthInfo, setValue]);

  return (
    <BootstrapModal
      show={isEditHealthInfoModalOpen}
      handleClose={closeEditHealthInfoModal}
      title={`Edit: ${selectedHealthInfo?.title}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <small className="form-text text-danger">Title is required</small>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
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

        <div className="mb-2">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            {...register("category", { required: true })}
          />
          {errors.category && (
            <small className="form-text text-danger">
              Category is required
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

export default EditHealthInfoModal;

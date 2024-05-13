import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useHealthInfoStore } from "../../store/useHealthInfoStore";
import { useHealthInfoData } from "../../hooks/useHealthInfoData";
import { BootstrapModal } from "../../components";
import HealthInfoAPI from "../../api/HealthInfoAPI";
import Toast from "../../utils/toast";

const AddHealthInfoModal = () => {
  // Get the state and actions from the store
  const { isAddHealthInfoModalOpen, closeAddHealthInfoModal } =
    useHealthInfoStore((state) => ({
      isAddHealthInfoModalOpen: state.isAddHealthInfoModalOpen,
      closeAddHealthInfoModal: state.closeAddHealthInfoModal,
    }));

  // Get refetch function from react-query hook
  const { refetch } = useHealthInfoData();

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Create mutation
  const { mutate } = useMutation(HealthInfoAPI.createHealthInfo, {
    onSuccess: () => {
      // close the modal and refetch the data
      closeAddHealthInfoModal();
      refetch();
      Toast({ type: "success", message: "HealthInfo created successfully" });
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
      show={isAddHealthInfoModalOpen}
      handleClose={closeAddHealthInfoModal}
      title="Add HealthInfo"
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="form-group">
          <label className="my-2" htmlFor="title">
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

        <div className="form-group">
          <label className="my-2" htmlFor="description">
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

        <div className="form-group">
          <label className="my-2" htmlFor="category">
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

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </BootstrapModal>
  );
};

export default AddHealthInfoModal;

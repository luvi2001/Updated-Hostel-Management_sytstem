import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useMedicalProfileStore } from "../../store/useMedicalProfileStore";
import { useMedicalProfileData } from "../../hooks/useMedicalProfileData";
import { BootstrapModal } from "../../components";
import MedicalProfileAPI from "../../api/MedicalProfileAPI";
import Toast from "../../utils/toast";
import { useStudentData } from "../../hooks/useUserData";

const AddMedicalProfileModal = () => {
  // Get the state and actions from the store
  const { isAddMedicalProfileModalOpen, closeAddMedicalProfileModal } =
    useMedicalProfileStore((state) => ({
      isAddMedicalProfileModalOpen: state.isAddMedicalProfileModalOpen,
      closeAddMedicalProfileModal: state.closeAddMedicalProfileModal,
    }));

  // Get refetch function from react-query hook
  const { refetch } = useMedicalProfileData();
  const { data: students } = useStudentData();

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Create mutation
  const { mutate } = useMutation(MedicalProfileAPI.createMedicalProfile, {
    onSuccess: () => {
      // close the modal and refetch the data
      closeAddMedicalProfileModal();
      refetch();
      Toast({
        type: "success",
        message: "MedicalProfile created successfully",
      });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  // Submit function
  const onSubmit = (values) => {
    values.height = Number(values.height);
    values.weight = Number(values.weight);
    mutate(values);
    reset();
  };

  return (
    <BootstrapModal
      show={isAddMedicalProfileModalOpen}
      handleClose={closeAddMedicalProfileModal}
      title="Create Medical Profile"
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {/* student select */}
        <div className="form-group">
          <label className="my-2" htmlFor="student">
            Student
          </label>
          <select
            className="form-control"
            id="student"
            name="student"
            {...register("student", { required: true })}
          >
            <option value="">Select student</option>
            {students?.data?.students?.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
          {errors.student && (
            <small className="form-text text-danger">Student is required</small>
          )}
        </div>

        <div className="form-group">
          <label className="my-2" htmlFor="allergies">
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
              Enter valid input for allergies
            </small>
          )}
        </div>

        <div className="form-group">
          <label className="my-2" htmlFor="medications">
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
              Enter valid input for medications
            </small>
          )}
        </div>

        {/* dropdown for blood type */}
        <div className="form-group">
          <label className="my-2" htmlFor="bloodType">
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
            <option value="Unknown">Unknown</option>
          </select>
          {errors.bloodType && (
            <small className="form-text text-danger">
              Blood type is required
            </small>
          )}
        </div>

        <div className="form-group">
          <label className="my-2" htmlFor="height">
            Height (in cm)
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

        <div className="form-group">
          <label className="my-2" htmlFor="weight">
            Weight (in kg)
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

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </BootstrapModal>
  );
};

export default AddMedicalProfileModal;

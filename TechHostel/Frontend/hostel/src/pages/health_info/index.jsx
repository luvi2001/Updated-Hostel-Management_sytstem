import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { useHealthInfoStore } from "../../store/useHealthInfoStore";
import { useHealthInfoData } from "../../hooks/useHealthInfoData";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import HealthInfoAPI from "../../api/HealthInfoAPI";
import AddHealthInfoModal from "./AddHealthInfoModal";
import EditHealthInfoModal from "./EditHealthInfoModal";
import ViewHealthInfoModal from "./ViewHealthInfoModal";
import { BootstrapTable } from "../../components";
import { generatePDF } from "../../utils/GeneratePDF";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";

const index = () => {
  // Get the state and actions from the store
  const {
    openAddHealthInfoModal,
    openEditHealthInfoModal,
    openViewHealthInfoModal,
    setSelectedHealthInfo,
  } = useHealthInfoStore((state) => ({
    openAddHealthInfoModal: state.openAddHealthInfoModal,
    openEditHealthInfoModal: state.openEditHealthInfoModal,
    openViewHealthInfoModal: state.openViewHealthInfoModal,
    setSelectedHealthInfo: state.setSelectedHealthInfo,
  }));

  // Get the data from the react-query hook
  const { data, refetch } = useHealthInfoData();

  // Delete mutation
  const { mutate } = useMutation(HealthInfoAPI.deleteHealthInfo, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "HealthInfo deleted successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  // Delete function
  const onDelete = (id) => {
    confirmMessage("Are you sure?", "This action cannot be undone.", () => {
      mutate(id);
    });
  };

  // Edit function
  const handleEdit = (healthInfo) => {
    setSelectedHealthInfo(healthInfo);
    openEditHealthInfoModal();
  };

  // PDF report function
  const downloadPDF = () => {
    const healthInfoCount = data.data.healthInfos.length;
    // get author name
    data.data.healthInfos.forEach((healthInfo) => {
      healthInfo.author = healthInfo.author?.name;
    });
    //
    const additionalInfo = `Total HealthInfos: ${healthInfoCount}`;
    //
    generatePDF(
      additionalInfo,
      ["author", "title", "description", "category"],
      data.data.healthInfos,
      "healthInfos-report"
    );
  };

  return (
    <div className="container mt-2">
      <AddHealthInfoModal />
      <EditHealthInfoModal />
      <ViewHealthInfoModal />

      <h1 className="mb-4">Health Informations</h1>

      <Button
        variant="primary"
        className="m-1"
        onClick={openAddHealthInfoModal}
      >
        <IoMdAddCircleOutline className="mb-1" /> <span>Add</span>
      </Button>

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      <div className="mt-5">
        <BootstrapTable
          headers={["Author", "Title", "Category", "Actions"]}
          children={
            data &&
            data.data.healthInfos.map((healthInfo) => (
              <tr key={healthInfo._id}>
                <td>{healthInfo.author?.name}</td>
                <td>{healthInfo.title}</td>
                <td>{healthInfo.category}</td>
                <td className="d-flex">
                  <Button
                    className="mx-1 px-2"
                    variant="info"
                    onClick={() => handleEdit(healthInfo)}
                    size="sm"
                  >
                    <MdEditSquare className="mb-1 mx-1" />
                  </Button>
                  <Button
                    className="mx-1 px-2 d-flex align-items-center"
                    variant="danger"
                    onClick={() => onDelete(healthInfo._id)}
                    size="sm"
                  >
                    <AiTwotoneDelete className="mb-1 mx-1" />
                  </Button>
                  <Button
                    className="mx-1 px-2"
                    variant="success"
                    onClick={() => {
                      setSelectedHealthInfo(healthInfo);
                      openViewHealthInfoModal();
                    }}
                    size="sm"
                  >
                    <FaInfoCircle className="mb-1 mx-1" />
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

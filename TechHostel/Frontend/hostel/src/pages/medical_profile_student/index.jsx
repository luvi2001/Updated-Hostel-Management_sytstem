import React from "react";
import { useMedicalProfilesByStudent } from "../../hooks/useMedicalProfileData";
import { BootstrapTable } from "../../components";

const index = () => {
  const { data: medicalProfiles } = useMedicalProfilesByStudent();
  //
  return (
    <div>
      <h1>Medical Profile</h1>
      <hr />
      {medicalProfiles?.data?.medicalProfiles?.map((medicalProfile) => (
        <div key={medicalProfile._id}>
          <h3>General Information</h3>
          <BootstrapTable
            headers={[
              "Allergies",
              "Medications",
              "Blood Type",
              "Height",
              "Weight",
            ]}
            children={[
              <tr key={medicalProfile._id}>
                <td>{medicalProfile.allergies}</td>
                <td>{medicalProfile.medications}</td>
                <td>{medicalProfile.bloodType}</td>
                <td>{medicalProfile.height}</td>
                <td>{medicalProfile.weight}</td>
              </tr>,
            ]}
          />
          <hr />

          <h3>Medical Records</h3>
          <BootstrapTable
            headers={["Condition", "Diagnosis Date", "Treatment"]}
            children={medicalProfile?.medicalRecords?.map((medicalRecord) => (
              <tr key={medicalRecord._id}>
                <td>{medicalRecord.condition}</td>
                <td>{medicalRecord.diagnosisDate}</td>
                <td>{medicalRecord.treatment}</td>
              </tr>
            ))}
          />
        </div>
      ))}
    </div>
  );
};

export default index;

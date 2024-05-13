import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  medicalProfiles: [],
  medicalRecords: [],
  selectedMedicalProfile: null,
  selectedMedicalRecord: null,
  isAddMedicalProfileModalOpen: false,
  isEditMedicalProfileModalOpen: false,
  isViewMedicalProfileModalOpen: false,
  isAddMedicalRecordModalOpen: false,
  isEditMedicalRecordModalOpen: false,
  isViewMedicalRecordModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setMedicalProfiles: (medicalProfiles) => set({ medicalProfiles }),
  setMedicalRecords: (medicalRecords) => set({ medicalRecords }),
  setSelectedMedicalProfile: (medicalProfile) =>
    set({ selectedMedicalProfile: medicalProfile }),
  setSelectedMedicalRecord: (medicalRecord) =>
    set({ selectedMedicalRecord: medicalRecord }),
  openAddMedicalProfileModal: () => set({ isAddMedicalProfileModalOpen: true }),
  closeAddMedicalProfileModal: () =>
    set({ isAddMedicalProfileModalOpen: false }),
  openEditMedicalProfileModal: () =>
    set({ isEditMedicalProfileModalOpen: true }),
  closeEditMedicalProfileModal: () =>
    set({ isEditMedicalProfileModalOpen: false }),
  openViewMedicalProfileModal: () =>
    set({ isViewMedicalProfileModalOpen: true }),
  closeViewMedicalProfileModal: () =>
    set({ isViewMedicalProfileModalOpen: false }),
  openAddMedicalRecordModal: () => set({ isAddMedicalRecordModalOpen: true }),
  closeAddMedicalRecordModal: () => set({ isAddMedicalRecordModalOpen: false }),
  openEditMedicalRecordModal: () => set({ isEditMedicalRecordModalOpen: true }),
  closeEditMedicalRecordModal: () =>
    set({ isEditMedicalRecordModalOpen: false }),
  openViewMedicalRecordModal: () => set({ isViewMedicalRecordModalOpen: true }),
  closeViewMedicalRecordModal: () =>
    set({ isViewMedicalRecordModalOpen: false }),
});

export const useMedicalProfileStore = create(
  devtools(store, "medicalProfileStore")
);

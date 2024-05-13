import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  healthInfos: [],
  selectedHealthInfo: null,
  isAddHealthInfoModalOpen: false,
  isEditHealthInfoModalOpen: false,
  isViewHealthInfoModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setHealthInfos: (healthInfos) => set({ healthInfos }),
  setSelectedHealthInfo: (healthInfo) =>
    set({ selectedHealthInfo: healthInfo }),
  openAddHealthInfoModal: () => set({ isAddHealthInfoModalOpen: true }),
  closeAddHealthInfoModal: () => set({ isAddHealthInfoModalOpen: false }),
  openEditHealthInfoModal: () => set({ isEditHealthInfoModalOpen: true }),
  closeEditHealthInfoModal: () => set({ isEditHealthInfoModalOpen: false }),
  openViewHealthInfoModal: () => set({ isViewHealthInfoModalOpen: true }),
  closeViewHealthInfoModal: () => set({ isViewHealthInfoModalOpen: false }),
});

export const useHealthInfoStore = create(devtools(store, "healthInfoStore"));

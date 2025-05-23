import { create } from "zustand";

type ModalType = "signup" | "login";

interface ModalStore {
  activeModal: ModalType | null;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  activeModal: null,
  openModal: (type) => set({ activeModal: type }),
  closeModal: () => set({ activeModal: null }),
}));

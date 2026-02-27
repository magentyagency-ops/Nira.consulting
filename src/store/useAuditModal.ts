import { create } from 'zustand';

interface AuditModalState {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useAuditModal = create<AuditModalState>()((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}));

import { create } from 'zustand';

interface SimulationModalState {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useSimulationModal = create<SimulationModalState>((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}));

import { create } from 'zustand';

interface useSidebarState {
  isOpen: boolean;
  toggle: () => void;
}

export const useSidebarStore = create<useSidebarState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
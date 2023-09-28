import { dialogStore } from "@/types/store";
import { create } from "zustand";

export const useDialogStore = create<dialogStore>((set) => ({
  show: false,
  component: undefined,
  showDialog: () => set({ show: true }),
  hideDialog: () => set({ show: false }),
  setComponent: (component: JSX.Element) => set({ component }),
}));

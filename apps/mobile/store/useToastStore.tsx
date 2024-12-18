import { create } from "zustand";
import uuid from "react-native-uuid";

export type ToastStore = {
  toasts: { id: string; message: string; visible: boolean }[];
  push: (message: string) => void;
  remove: (id: string) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  push: (message) =>
    set((state) => ({
      toasts: [...state.toasts, { id: uuid.v4(), message, visible: true }],
    })),
  remove: (id: string) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));

const show = (message: string) => {
  const id = uuid.v4();
  useToastStore.setState((state) => ({
    toasts: [...state.toasts, { id, message, visible: true }],
  }));
  const VISIBLE = 3000;
  setTimeout(() => {
    useToastStore.setState((state) => ({
      toasts: state.toasts.map((toast) =>
        toast.id === id ? { ...toast, visible: false } : toast
      ),
    }));
  }, VISIBLE);

  const DISPOSE = 4000;
  setTimeout(() => {
    useToastStore.setState((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  }, DISPOSE);
};

export const toast = {
  show,
};

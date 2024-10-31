import type { Notification } from "@1post/shared";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface INotificationState {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
}

const useNotificationStore = create<INotificationState>()(
  immer((set) => ({
    notifications: [],
    setNotifications: (notifications) =>
      set((state) => {
        state.notifications = notifications;
      }),
  })),
);

export default useNotificationStore;

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { Tables } from "@/types/database.types";

export type NotificationsResponse = Tables<"notifications">;

interface INotificationState {
  notifications: NotificationsResponse[];
  setNotifications: (notifications: NotificationsResponse[]) => void;
}

interface INotificationActions {
  addNotification: (notification: NotificationsResponse) => void;
  markAsRead: (ids: string[]) => void;
}

const useNotificationStore = create<
  INotificationState & INotificationActions
>()(
  immer((set) => ({
    notifications: [],
    setNotifications: (notifications) =>
      set((state) => {
        state.notifications = notifications;
      }),
    addNotification: (notification) =>
      set((state) => {
        state.notifications.unshift(notification);
      }),
    markAsRead: (ids) =>
      set((state) => {
        state.notifications = state.notifications.map((n) => {
          if (ids.includes(n.id)) {
            return { ...n, is_read: true };
          }
          return n;
        });
      }),
  })),
);

export default useNotificationStore;

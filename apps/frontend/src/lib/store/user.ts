import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { Tables } from "@/types/database.types";

interface IUserState {
  user: Tables<"Profile"> | null;
  setUser: (user: Tables<"Profile"> | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

interface IUserActions {
  updateUser: (user: Tables<"Profile">) => void;
}

const useUserStore = create<IUserState & IUserActions>()(
  immer((set) => ({
    user: null,
    setUser: (user) =>
      set((state) => {
        state.user = user;
      }),
    isLoading: true,
    setIsLoading: (isLoading) =>
      set((state) => {
        state.isLoading = isLoading;
      }),
    updateUser: (user) =>
      set((state) => {
        state.user = user;
      }),
  })),
);

export default useUserStore;

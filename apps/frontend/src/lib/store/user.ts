import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { Tables } from "@/types/database.types";

export type MeResponse = Omit<Tables<"users">, "email">;

interface IUserState {
  user: MeResponse | null;
  setUser: (user: MeResponse | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

interface IUserActions {
  updateUser: (user: MeResponse) => void;
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

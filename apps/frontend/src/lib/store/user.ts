import type { User } from "@1post/shared";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type MeResponse = Omit<User, "email">;

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

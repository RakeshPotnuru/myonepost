import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  username: string;
  displayName: string;
  bio: null;
  avatarUrl: string;
  url: null;
  nextPostAllowedAt: Date;
  isPrivate: boolean;
  subscriberCount: number;
  subscriptionCount: number;
}

interface IUserState {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

interface IUserActions {
  updateUser: (user: User) => void;
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

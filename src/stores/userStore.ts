import { create } from 'zustand';
import { IUser } from '../interfaces/IUser';

type Store = {
  user?: IUser;
  setUser: (user: IUser) => void;
};

export const useUserStore = create<Store>()((set) => ({
  setUser: (user: IUser) => set((state) => ({ ...state, user })),
}));

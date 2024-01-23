import { create } from 'zustand';

const userStore = create((set) => ({
  accessToken: '',
  setAccessToken: (value) => set({ accessToken: value }),
}));

export default userStore;

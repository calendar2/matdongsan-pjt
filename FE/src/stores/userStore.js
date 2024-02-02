import { create } from 'zustand';

const userStore = create((set) => ({
  accessToken: '',
  setAccessToken: (value) => set({ accessToken: value }),
  loginModalOpen: false,
  setLoginModalOpen: (value) => set({ loginModalOpen: value }),
}));

export default userStore;

import { create } from 'zustand';

const userStore = create((set) => ({
  accessToken: '',
  setAccessToken: (value) => set({ accessToken: value }),
  loginModalOpen: false,
  setLoginModalOpen: (value) => set({ loginModalOpen: value }),
  isMyPage: true,
  setIsMyPage: (value) => set({ isMyPage: value }),
  pageID: 1,
  setPageID: (value) => set({ pageID: value }),
}));

export default userStore;

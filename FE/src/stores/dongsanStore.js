import { create } from 'zustand';

const dongsanStore = create((set) => ({
  visible: true,
  setVisible: (value) => set({ visible: value }),
}));

export default dongsanStore;

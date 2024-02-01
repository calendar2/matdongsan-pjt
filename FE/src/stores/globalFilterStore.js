import { create } from 'zustand';

const globalFilterStore = create((set) => ({
  userSort: 0,
  setUserSort: (value) => set({ userSort: value }),
  userAge: 0,
  setUserAge: (value) => set({ userAge: value }),
  rankSort: 0,
  setRankSort: (value) => set({ rankSort: value }),
  restaurantMenu: [],
  setRestaurantMenu: (value) => set({ restaurantMenu: value }),
  location: '',
  setLocation: (value) => set({ location: value }),
  API_URL: '//i10a209.p.ssafy.io:4000/naver/search',
}));

export default globalFilterStore;

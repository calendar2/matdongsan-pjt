import { create } from 'zustand';

const globalFilterStore = create((set) => ({
  userSort: 0,
  setUserSort: (value) => set({ userSort: value }),
  userAge: 0,
  setUserAge: (value) => set({ userAge: value }),
  rankSort: 0,
  setRankSort: (value) => set({ rankSort: value }),
  restaurantMenu: [
    { title: '족발/보쌈' },
    { title: '돈까스/회/일식' },
    { title: '고기/구이' },
    { title: '피자' },
    { title: '찜/탕/찌개' },
    { title: '양식' },
    { title: '중식' },
    { title: '아시안' },
    { title: '치킨' },
    { title: '백반/죽/국수' },
    { title: '버거' },
    { title: '분식' },
    { title: '카페/디저트' }, // 더미임
  ],
  choisedMenu: [],
  setChoisedMenu: (value) => set({ choisedMenu: value }),
  location: '',
  setLocation: (value) => set({ location: value }),
}));

export default globalFilterStore;

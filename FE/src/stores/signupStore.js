import { create } from 'zustand';

const signupStore = create((set) => ({
  gender: '',
  setGender: (value) => set({ gender: value }),
  age: '',
  setAge: (value) => set({ age: value }),
  regionInterest: '',
  setRegionInterest: (value) => set({ regionInterest: value }),
  spicyLevel: '',
  setSpicyLevel: (value) => set({ spicyLevel: value }),
  regionTotal: [
    {
      regionName: '서울특별시 강남구 역삼동',
    },
  ],
  setRegionTotal: (value) => set({ regionTotal: value }),
}));

export default signupStore;

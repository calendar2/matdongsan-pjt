import { create } from 'zustand';
import dayjs from 'dayjs';

const reviewFilterStore = create((set) => ({
  userFriend: [
    { title: '다은' },
    { title: '민재' },
    { title: '형준' },
    { title: '준엽' },
    { title: '자영' },
    { title: '용수' },
    { title: '수용' },
    { title: '영자' },
    { title: '엽준' },
    { title: '준형' },
    { title: '재민' },
    { title: '은다' },
  ],
  setUserFriend: (value) => set({ userFriend: value }),
  selectedFriend: [],
  setSelectedFriend: (value) => set({ selectedFriend: value }),
  selectedStartDate: dayjs('2024-01-01'),
  setSelectedStartDate: (value) => set({ selectedStartDate: value }),
  selectedEndDate: dayjs('2024-01-01'),
  setSelectedEndDate: (value) => set({ selectedEndDate: value }),
}));

export default reviewFilterStore;

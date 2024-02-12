import { create } from 'zustand';
import dayjs from 'dayjs';

const reviewFilterStore = create((set) => ({
  searchKeyWord: '',
  setSearchKeyWord: (value) => set({ searchKeyWord: value }),
  setUserFriend: (value) => set({ userFriend: value }),
  selectedFriend: [],
  setSelectedFriend: (value) => set({ selectedFriend: value }),
  selectedStartDate: dayjs(dayjs().format('YYYY-MM-DD')),
  setSelectedStartDate: (value) => set({ selectedStartDate: value }),
  selectedEndDate: dayjs(dayjs().format('YYYY-MM-DD')),
  setSelectedEndDate: (value) => set({ selectedEndDate: value }),
  businessTypesCategory: [],
  setBusinessTypesCategory: (value) =>
    set({ selectedEndDate: value }),
  selectedBusinessTypes: '',
  setSelectedBusinessTypes: (value) =>
    set({ selectedBusinessTypes: value }),
  setUserLocation: (value) => set({ userLocation: value }),
  selectedUserLocation: '',
  setSelectedUserLocation: (value) =>
    set({ selectedUserLocation: value }),
}));

export default reviewFilterStore;

import { create } from 'zustand';
import dayjs from 'dayjs';

const reviewFilterStore = create((set) => ({
  searchKeyWord: '',
  setSearchKeyWord: (value) => set({ searchKeyWord: value }),
  userFriend: [
    { title: '다은' },
    { title: '민재' },
    { title: '형준' },
    { title: '준엽' },
    { title: '자영' },
    { title: '용수' },
  ],
  setUserFriend: (value) => set({ userFriend: value }),
  selectedFriend: [],
  setSelectedFriend: (value) => set({ selectedFriend: value }),
  selectedStartDate: dayjs('2024-01-01'),
  setSelectedStartDate: (value) => set({ selectedStartDate: value }),
  selectedEndDate: dayjs('2024-01-01'),
  setSelectedEndDate: (value) => set({ selectedEndDate: value }),
  businessTypesCategory: [
    { label: '족발 / 보쌈' },
    { label: '돈까스 / 회 / 일식' },
    { label: '양식' },
    { label: '중식' },
    { label: '고기 / 구이' },
    { label: '아시안' },
    { label: '백반 / 죽 / 국수' },
    { label: '버거' },
    { label: '카페 / 디저트' },
    { label: '찜 / 탕 / 찌개' },
    { label: '피자' },
    { label: '치킨' },
    { label: '분식' },
  ],
  setStoreCategory: (value) => set({ storeCategory: value }),
  selectedBusinessTypes: '',
  setSelectedBusinessTypes: (value) =>
    set({ selectedBusinessTypes: value }),
  userLocation: [
    // 이거 장소 api 다 받아와서 여기에 넣어야될거같은데 ?
    { title: '서울 강남구 언주로93길 22-3 지상 1층' },
    { title: '서울 강남구 언주로94길 9-5 1층' },
    {
      title: '서울 강남구 테헤란로10길 21 1층 신동궁감자탕뼈숯불구이',
    },
    {
      title: '경기 수원시 장안구 조원로111번길 39 치환빌딩 1층',
    },
    {
      title: '제주 제주시 조천읍 신북로 544',
    },
  ],
  setUserLocation: (value) => set({ userLocation: value }),
  selectedUserLocation: '',
  setSelectedUserLocation: (value) =>
    set({ selectedUserLocation: value }),
}));

export default reviewFilterStore;

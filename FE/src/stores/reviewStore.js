import { create } from 'zustand';

const reviewStore = create((set) => ({
  reviewStoreList: [
    {
      id: '0',
      가게이름: '서울집',
      위치: '백반 / 죽 / 국수',
      업종: '한식',
      친절도: '3',
      맛: '5',
    },
    {
      id: '1',
      가게이름: '서울집1',
      위치: '백반 / 죽 / 국수',
      업종: '한식',
      친절도: '3',
      맛: '5',
    },
    {
      id: '2',
      가게이름: '서울집2',
      위치: '백반 / 죽 / 국수',
      업종: '한식',
      친절도: '3',
      맛: '5',
    },
    {
      id: '3',
      가게이름: '노브랜드버거',
      위치: '역삼동',
      업종: '버거',
      친절도: '4',
      맛: '3',
    },
    {
      id: '4',
      가게이름: '고갯마루',
      위치: '역삼동',
      업종: '찜 / 탕 / 찌개',
      친절도: '4',
      맛: '4',
    },
  ],
  setreviewStoreList: (value) => set({ reviewStoreList: value }),
}));

export default reviewStore;

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
      버튼: false,
    },
    {
      id: '1',
      가게이름: '서울집1',
      위치: '백반 / 죽 / 국수',
      업종: '한식',
      친절도: '3',
      맛: '5',
      버튼: false,
    },
    {
      id: '2',
      가게이름: '서울집2',
      위치: '백반 / 죽 / 국수',
      업종: '한식',
      친절도: '3',
      맛: '5',
      버튼: false,
    },
    {
      id: '3',
      가게이름: '노브랜드버거',
      위치: '역삼동',
      업종: '버거',
      친절도: '4',
      맛: '3',
      버튼: false,
    },
    {
      id: '4',
      가게이름: '고갯마루1',
      위치: '역삼동',
      업종: '찜 / 탕 / 찌개',
      친절도: '4',
      맛: '4',
      버튼: false,
    },
    {
      id: '5',
      가게이름: '고갯마루3',
      위치: '역삼동',
      업종: '찜 / 탕 / 찌개',
      친절도: '4',
      맛: '4',
      버튼: false,
    },
    {
      id: '6',
      가게이름: '고갯마루4',
      위치: '역삼동',
      업종: '찜 / 탕 / 찌개',
      친절도: '4',
      맛: '4',
      버튼: false,
    },
    {
      id: '7',
      가게이름: '고갯마루5',
      위치: '역삼동',
      업종: '찜 / 탕 / 찌개',
      친절도: '4',
      맛: '4',
      버튼: false,
    },
    {
      id: '8',
      가게이름: '고갯마루61',
      위치: '역삼동',
      업종: '찜 / 탕 / 찌개',
      친절도: '4',
      맛: '4',
      버튼: false,
    },
    {
      id: '9',
      가게이름: '고갯마루62',
      위치: '역삼동',
      업종: '찜 / 탕 / 찌개',
      친절도: '4',
      맛: '4',
      버튼: false,
    },
    {
      id: '10',
      가게이름: '고갯마루63',
      위치: '역삼동',
      업종: '찜 / 탕 / 찌개',
      친절도: '4',
      맛: '4',
      버튼: false,
    },
    {
      id: '11',
      가게이름: '고갯마루64',
      위치: '역삼동',
      업종: '찜 / 탕 / 찌개',
      친절도: '4',
      맛: '4',
      버튼: false,
    },
    {
      id: '12',
      가게이름: '고갯마루65',
      위치: '역삼동',
      업종: '찜 / 탕 / 찌개',
      친절도: '4',
      맛: '4',
      버튼: false,
    },
    {
      id: '13',
      가게이름: '고갯마루66',
      위치: '역삼동',
      업종: '찜 / 탕 / 찌개',
      친절도: '4',
      맛: '4',
      버튼: false,
    },
    {
      id: '14',
      가게이름: '고갯마루67',
      위치: '역삼동',
      업종: '찜 / 탕 / 찌개',
      친절도: '4',
      맛: '4',
      버튼: false,
    },
    {
      id: '15',
      가게이름: '고갯마루68',
      위치: '역삼동',
      업종: '찜 / 탕 / 찌개',
      친절도: '4',
      맛: '4',
      버튼: false,
    },
    {
      id: '16',
      가게이름: '고갯마루69',
      위치: '역삼동',
      업종: '찜 / 탕 / 찌개',
      친절도: '4',
      맛: '4',
      버튼: false,
    },
    {
      id: '17',
      가게이름: '고갯마루70',
      위치: '역삼동',
      업종: '찜 / 탕 / 찌개',
      친절도: '4',
      맛: '4',
      버튼: false,
    },
    {
      id: '18',
      가게이름: '고갯마루71',
      위치: '역삼동',
      업종: '찜 / 탕 / 찌개',
      친절도: '4',
      맛: '4',
      버튼: false,
    },
  ],
  setreviewStoreList: (value) => set({ reviewStoreList: value }),
  setreviewStoreListButton: (index) =>
    set((state) => {
      const updatedList = state.reviewStoreList.map((item, idx) =>
        idx === index ? { ...item, 버튼: !item.버튼 } : item
      );
      return { reviewStoreList: updatedList };
    }),
  reviewListSubItems: [
    {
      id: '0',
      가게이름: '고갯마루',
      친철도: '4',
      맛: '4',
      업종: '찜 / 탕 / 찌개',
      내용: '살짝 매콤했음, 다음에 갈때는 예약을 하고 가야겠음',
      사진: '사진',
      같이간친구: '민재, 준엽',
      방문한날짜: '2024.01.27',
      위치: '역삼동',
    },
  ],
  setreviewListSubItems: (value) =>
    set({ reviewListSubItems: value }),
}));

export default reviewStore;

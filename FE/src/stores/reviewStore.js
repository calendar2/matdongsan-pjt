import { create } from 'zustand';

const reviewStore = create((set) => ({
  API_URL: 'https://i10a209.p.ssafy.io:3000',
  // API_URL: 'http://i10a209.p.ssafy.io/api',
  // API_URL: 'http://70.12.246.119:4000',
  registration: false,
  setRegistration: (value) => set({ registration: value }),
  update: false,
  setUpdate: (value) => set({ update: value }),
  remove: false,
  setRemove: (value) => set({ remove: value }),
  restaurantStore: [],
  setRestaurantStore: (value) => set({ restaurantStore: value }),
  sortByVisitCount: () => {
    set((state) => ({
      // 방문횟수로 정렬
      restaurantStore: [...state.restaurantStore].sort((a, b) => {
        const visitCountA = parseInt(a.방문횟수, 10);
        const visitCountB = parseInt(b.방문횟수, 10);
        return visitCountB - visitCountA;
      }),
    }));
  },
  sortByRecentVisitDate: () => {
    set((state) => ({
      // 최근방문날짜로 정렬
      restaurantStore: [...state.restaurantStore].sort((a, b) => {
        const dateA = new Date(a.최근방문날짜);
        const dateB = new Date(b.최근방문날짜);
        return dateB - dateA;
      }),
    }));
  },
  sortByAverageTasteAndKindness: () => {
    set((state) => ({
      restaurantStore: [...state.restaurantStore].sort((a, b) => {
        // 맛과 친절도의 평균을 계산
        const avgA =
          (parseInt(a.맛, 10) + parseInt(a.친절도, 10)) / 2;
        const avgB =
          (parseInt(b.맛, 10) + parseInt(b.친절도, 10)) / 2;
        // 평균을 기준으로 정렬
        return avgB - avgA;
      }),
    }));
  },
  myReviewStore: [
    // id = restaurant_id
    // 리뷰id = (리뷰 전체 목록 get할때 각 리뷰의 id도 같이 나오게 API 수정 필요)
    // 사진 = (리뷰 테이블에 사진 항목이 없어서 API 수정 필요)
    // 가게이름 = (음식점store에서 가게 이름 가져오기)
    // 친절도 = kindness_rating
    // 맛 = taste_rating
    // 업종 = (음식점store에서 업종 가져오기)
    // 내용 = content
    // 같이간친구 = (personTagList accountIdList 합치기 )
    // 방문한날짜 = visit_date
    // 위치 = (음식점store에서 위치 가져오기)
  ],
  setMyReviewStore: (value) => set({ myReviewStore: value }),
}));

export default reviewStore;

import { create } from 'zustand';

const dongsanStore = create((set) => ({
  API_URL: 'http://70.12.246.119:4000', // 로컬 개발환경
  // API_URL: 'http://i10a209.p.ssafy.io:4000', // 젠킨스 환경
  visible: true,
  setVisible: (value) => set({ visible: value }),
  dongsanUsers: [
    { nickname: '김더미', followers: '513', filter: true },
  ], // 로그인된 유저의 정보를 넣음 (로그인 됐을때 바로 넣기)
  toggleDongsanUsersFilter: (index) =>
    set((state) => {
      const updatedUsers = [...state.dongsanUsers];
      updatedUsers[index].filter = !updatedUsers[index].filter;
      return { dongsanUsers: updatedUsers };
    }),
  setDongsanUsers: (value) => set({ dongsanUsers: value }),
}));

export default dongsanStore;

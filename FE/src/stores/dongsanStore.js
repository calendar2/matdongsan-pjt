import { create } from 'zustand';

const dongsanStore = create((set) => ({
  visible: true,
  setVisible: (value) => set({ visible: value }),
  dongsanUsers: [
    { id: 0, nickname: '나', followers: 513, filter: true },
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

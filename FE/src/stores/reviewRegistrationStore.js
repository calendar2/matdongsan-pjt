import { create } from 'zustand';
import dayjs from 'dayjs';

const reviewRegistrationStore = create((set) => ({
  가게이름: '',
  가게이름수정: (value) => set({ 가게이름: value }),
  친절도: 0,
  친절도수정: (value) => set({ 친절도: value }),
  맛: 0,
  맛수정: (value) => set({ 맛: value }),
  사진: '',
  사진수정: (value) => set({ 사진: value }),
  내용: '',
  내용수정: (value) => set({ 내용: value }),
  전체친구: [
    // 내 전체 친구 확인하는 API가 있는지 확인할 필요
    { title: '다은' },
    { title: '민재' },
    { title: '형준' },
    { title: '준엽' },
    { title: '자영' },
    { title: '용수' },
  ],
  같이간친구: '',
  같이간친구수정: (value) => set({ 같이간친구: value }),
  임의친구이름: '',
  임의친구이름수정: (value) => set({ 임의친구이름: value }),
  임의친구생년: dayjs('2024-01-01'),
  임의친구생년수정: (value) => set({ 임의친구생년: value }),
  방문날짜: dayjs('2024-01-01'),
  방문날짜수정: (value) => set({ 방문날짜: value }),
  임의친구들: [],
  임의친구들수정: (value) => set({ 임의친구들: value }),
}));

export default reviewRegistrationStore;

import { create } from 'zustand';

const urlStore = create(() => ({
  API_URL: 'http://70.12.246.119:4000', // 로컬 개발환경
  // API_URL: 'https://i10a209.p.ssafy.io/api', // 젠킨스 환경
}));

export default urlStore;

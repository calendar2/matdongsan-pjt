import { create } from 'zustand';

const mapStore = create((set) => ({
  map: null,
  setMap: (value) => set({ map: value }),
  marker: {},
  setMarker: (value) => set({ marker: value }),
  seoulLat: 33.450701,
  seoulLng: 126.570667,
}));

export default mapStore;

import { create } from 'zustand';

const mapStore = create((set) => ({
  map: null,
  setMap: (value) => set({ map: value }),
  marker: null,
  setMarker: (value) => set({ marker: value }),
}));

export default mapStore;

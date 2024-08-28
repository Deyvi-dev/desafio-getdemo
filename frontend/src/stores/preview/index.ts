import {create} from 'zustand';

interface PreviewState {
  previewMode: boolean;
  setPreviewMode: (mode: boolean) => void;
}

export const usePreviewStore = create<PreviewState>((set) => ({
  previewMode: false,
  setPreviewMode: (mode) => set({ previewMode: mode }),
}));

import { create } from 'zustand';
import { HotspotState } from './types';
import { FramePosition } from '@/types';

export const useHotspotStore = create<HotspotState>((set) => ({
  hotspots: {},
  isHotspotMode: false,
  targetIframe: null,
  frameId: '',
  setFrameId: (frameId) => set({ frameId }),
  setHotspot: (frameId, hotspotPosition) => set((state) => ({
    hotspots: { ...state.hotspots, [frameId]: hotspotPosition },
  })),
  setIsHotspotMode: (mode) => set({ isHotspotMode: mode }),
  setTargetIframe: (iframe) => set({ targetIframe: iframe }),
  handleElementClick: (event: MouseEvent) =>
    set((state) => {
      if (!state.isHotspotMode || !state.targetIframe) return state;

      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      const iframeDocument = state.targetIframe?.contentDocument;
      
      if (iframeDocument && iframeDocument.contains(target)) {
        const newHotspot: FramePosition = {
          x: event.clientX,
          y: event.clientY,
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          element: target,
        };

        return {
          hotspots: { ...state.hotspots, [state.frameId]: newHotspot },
          frameId: state.frameId,
          isHotspotMode: false,
        };
      }

      return state;
    }),
}));

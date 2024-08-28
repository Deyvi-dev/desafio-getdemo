import { create } from 'zustand';

import { FramePosition } from '@/types';
import { TooltipState } from './type';

export const useTooltipStore = create<TooltipState>((set) => ({
  tooltipPosition: null,
  isTooltipMode: false,
  targetIframe: null,
  setTooltip: (tooltipPosition) => set({ tooltipPosition }),
  setIsTooltipMode: (mode) => set({ isTooltipMode: mode }),
  setTargetIframe: (iframe) => set({ targetIframe: iframe }),
  handleTooltipClick: (event: MouseEvent) =>
    set((state) => {
      if (!state.isTooltipMode || !state.targetIframe) return state;
      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();


      const iframeDocument = state.targetIframe?.contentDocument;
      if (iframeDocument && iframeDocument.contains(target)) {
        const newTooltip: FramePosition = {
            x: event.clientX,
            y: event.clientY,
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            element: target,
        };

        return {
          tooltipPosition: newTooltip,
          isTooltipMode: false,
        };
      }

      return state; 
    }),
}));

import { create } from "zustand";
import { Frame, FrameStore } from "./types";

export const useFrameStore = create<FrameStore>((set) => ({
  cleanFrames: () => set({ frames: [], removedFrames: [] }),
  selectedFrameId: null,
  frames: [],
  removedFrames: [],
  setSelectedFrame: (id: string) => set({ selectedFrameId: id }),
  addOrUpdateFrame: (frame: Frame) =>
    set((state) => {
      const existingFrameIndex = state.frames.findIndex(
        (f) => f.id === frame.id
      );
      if (existingFrameIndex !== -1) {
        const updatedFrames = [...state.frames];
        updatedFrames[existingFrameIndex] = frame;
        return { frames: updatedFrames };
      } else {
        return { frames: [...state.frames, frame] };
      }
    }),
  removeFrame: (id: string) =>
    set((state) => {
      const updatedFrames = state.frames.filter(f => f.id !== id);
      return {
        frames: updatedFrames,
        removedFrames: [...state.removedFrames, id]
      };
    }),
}));

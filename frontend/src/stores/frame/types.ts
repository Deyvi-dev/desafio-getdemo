export type Frame = {
  id: string;
  html: string;
  order?: number;
};

export type FrameStore = {
  selectedFrameId: string | null;
  frames: Frame[];
  removedFrames: string[];
  setSelectedFrame: (id: string) => void;
  addOrUpdateFrame: (frame: Frame) => void;
  cleanFrames: () => void;
  removeFrame: (id: string) => void;
};

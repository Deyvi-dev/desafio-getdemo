import { FramePosition } from "@/types";

type HotspotState = {
  hotspots: Record<string, FramePosition>;
  isHotspotMode: boolean;
  targetIframe: HTMLIFrameElement | null;
  frameId: string;
  setFrameId: (frameId: string) => void;
  setHotspot: (frameId: string, hotspotPosition: FramePosition) => void;
  setIsHotspotMode: (mode: boolean) => void;
  setTargetIframe: (iframe: HTMLIFrameElement | null) => void;
  handleElementClick: (event: MouseEvent) => void;
};


export type { HotspotState }


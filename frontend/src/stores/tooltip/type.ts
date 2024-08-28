import { FramePosition } from "@/types";

export type TooltipState = {
    tooltipPosition: FramePosition | null;
    isTooltipMode: boolean;
    targetIframe: HTMLIFrameElement | null;
    setTooltip: (tooltipPosition: FramePosition) => void;
    setIsTooltipMode: (mode: boolean) => void;
    setTargetIframe: (iframe: HTMLIFrameElement | null) => void;
    handleTooltipClick: (event: MouseEvent) => void;
  }

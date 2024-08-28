import { useEffect, useRef } from "react";
import { Frame } from "@/types";
import { useFetch } from "@/hooks/useSRW";
import { useFrameStore } from "@/stores/frame";

interface IframeRefs {
  [key: string]: HTMLIFrameElement | null;
}

export function useIframe(demoId: string) {
  const iframeRefs = useRef<IframeRefs>({});
  const selectedFrameId = useFrameStore((state) => state.selectedFrameId);
  const setSelectedFrame = useFrameStore((state) => state.setSelectedFrame);
  const frames = useFrameStore((state) => state.frames);
  const setFrames = useFrameStore((state) => state.addOrUpdateFrame);
  const { data: framesData, error, isLoading } = useFetch<Frame[]>(`/frames/${demoId}`);

  useEffect(() => {
    if (framesData) {
      framesData.forEach((frame) => setFrames(frame));
      if (framesData.length > 0) {
        iframeRefs.current[framesData[0].id] = null;
      }
    }
    if(!selectedFrameId && framesData && framesData.length > 0){
      setSelectedFrame(framesData[0].id);
    }
  }, [framesData, setFrames]);

  return { iframeRefs, frames, selectedFrameId, error, isLoading};
}

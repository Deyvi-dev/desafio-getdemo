import { useHotspotStore } from "@/stores/hotspot";
import { useFrameStore } from "@/stores/frame";
import { useState, useEffect, useRef } from "react";
import { usePreviewStore } from "@/stores/preview";
export function Hotspot() {
  const hotspots = useHotspotStore((state) => state.hotspots);
  const frameId = useHotspotStore((state) => state.frameId);
  const selectedFrameId = useFrameStore((state) => state.selectedFrameId);
  const frames = useFrameStore((state) => state.frames);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prevPosition = useRef({ x: 0, y: 0 });
  const setSelectedFrame = useFrameStore((state) => state.setSelectedFrame);

  const currentFrameOrder = frames.find((frame) => frame.id === frameId)?.order;


  const previewMode = usePreviewStore((state) => state.previewMode);

  useEffect(() => {
    if (frameId === selectedFrameId && hotspots[frameId]) {
      const currentPosition = hotspots[frameId];

      if (
        prevPosition.current.x !== currentPosition.x ||
        prevPosition.current.y !== currentPosition.y
      ) {
        setPosition(currentPosition);
        prevPosition.current = currentPosition;
      }
    }
  }, [frameId, selectedFrameId, hotspots]);

  if (!hotspots[frameId] || frameId !== selectedFrameId) return null;

  const hotspotPosition = position;
  const leftPosition = `${(hotspotPosition.x / window.innerWidth) * 100}vw`;
  const topPosition = `${(hotspotPosition.y / window.innerHeight) * 100}vh`;



  
  const handleHotspotClick = () => {
    if (!previewMode) return;
    const nextFrame = frames.find(
      (frame) => frame.order === currentFrameOrder! + 1
    );

    if (nextFrame) {
      setTimeout(() => {
        setSelectedFrame(nextFrame.id);
      }, 200);
 
    }
  };

  return (
    <div
      className="absolute z-50 w-52 h-52 transition-all duration-900 ease-out"
      style={{
        left: leftPosition,
        top: topPosition,
        transform: "translate(-50%, -50%)",
        cursor: "pointer",
      }}
      onClick={handleHotspotClick}
    >
      <div
        className="w-6 h-6 animate-pulse rounded-full bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition-all duration-900 ease-out"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping"></span>
      </div>
    </div>
  );
}

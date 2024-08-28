import { useParams } from "react-router-dom";
import { FrameSelector } from "@/components/FrameSelector";
import { Hotspot } from "@/components/Hotspot";
import { useIframe } from "@/hooks/useIframe";
import { handleDoubleClick, highlightElement, removeHighlight } from "@/helpers/iframeEvents";
import { useFrameStore } from "@/stores/frame";
import { PlusTools } from "@/components/PlusTools";
import { useHotspotStore } from "@/stores/hotspot";
import { useEffect } from "react";
import { DraggableTooltip } from "@/components/DraggableTooltip";
import { useTooltipStore } from "@/stores/tooltip";
import { LoadingSpinner } from "@/components/LoadingSpinner";

function DemoPage() {
  const { demoId } = useParams<{ demoId: string }>();
  const { iframeRefs, frames, selectedFrameId, error, isLoading  } = useIframe(demoId || "");

  const {
    isHotspotMode,
    setIsHotspotMode,
    setTargetIframe: setTargetIframeHotspot,
    handleElementClick,
    setFrameId,
  } = useHotspotStore();
  const {
    isTooltipMode,
    setIsTooltipMode,
    setTargetIframe: setTooltipTargetIframe,
    handleTooltipClick,
  } = useTooltipStore();

  useEffect(() => {
    if (selectedFrameId) {
      handleIframeLoad(selectedFrameId );
      setFrameId(selectedFrameId);
    }
  }, [selectedFrameId, isHotspotMode, isTooltipMode]);


  if (error) return <div>Failed to load</div>;
  if (isLoading) return <LoadingSpinner />;

  const handleIframeLoad = (frameId: string) => {
    const iframe = iframeRefs.current[frameId];
    const iframeDocument = iframe?.contentDocument || iframe?.contentWindow?.document;

    if (iframeDocument) {
      if (isHotspotMode) {
        setTargetIframeHotspot(iframe);
        iframeDocument.body.addEventListener("mouseover", (event) => highlightElement(event, isHotspotMode));
        iframeDocument.body.addEventListener("mouseout", (event) => removeHighlight(event, isHotspotMode));
        iframeDocument.body.addEventListener("click", (event) => handleElementClick(event));
      }

      if (isTooltipMode) {
        setTooltipTargetIframe(iframe);
        iframeDocument.body.addEventListener("mouseover", (event) => highlightElement(event, isHotspotMode));
        iframeDocument.body.addEventListener("mouseout", (event) => removeHighlight(event, isHotspotMode));
        iframeDocument.body.addEventListener("click", (event) => handleTooltipClick(event));
      }

      iframeDocument.body.addEventListener("dblclick", (event) => handleDoubleClick(event, frameId, async () => {
        return await stateFrame(iframe, frameId );
      }));
    }
  };

  const stateFrame = async (iframe: HTMLIFrameElement, frameId: string) => {
    const iframeDocument = iframe?.contentDocument || iframe?.contentWindow?.document;

    if (iframeDocument) {
      const updatedHTML = iframeDocument.documentElement.outerHTML;
      useFrameStore.getState().addOrUpdateFrame({
        id: frameId,
        html: updatedHTML,
      });
    }
  };

  return (
    <>
      <PlusTools
        onHotspotClick={() => {
          setIsHotspotMode(true);
          if (selectedFrameId !== null) {
            setFrameId(selectedFrameId);
          }
        }}
        onDraggableTooltipClick={() => {
          setIsTooltipMode(true);
        }}
      />
      <Hotspot />
      <DraggableTooltip />
      {frames.length > 0 && (
        <div className="w-screen h-screen relative">
          <div className="relative w-full h-full">
            {frames.map((frame) =>
              frame.id === selectedFrameId ? (
                <iframe
                  key={frame.id}
                  ref={(el) => (iframeRefs.current[frame.id] = el)}
                  srcDoc={frame.html}
                  onLoad={() => handleIframeLoad(frame.id)}
                  title={`Frame ${frame.id}`}
                  className="w-full h-full"
                />
              ) : null
            )}
          </div>
          <FrameSelector frames={frames} />
        </div>
      )}
    </>
  );
}

export default DemoPage;

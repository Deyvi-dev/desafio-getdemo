import { useFrameStore } from "@/stores/frame";

export const stateFrame = async (iframe: HTMLIFrameElement | null, frameId: string, frameOrder: number) => {
  const iframeDocument = iframe?.contentDocument || iframe?.contentWindow?.document;

  if (iframeDocument) {
    const updatedHTML = iframeDocument.documentElement.outerHTML;
    useFrameStore.getState().addOrUpdateFrame({
      id: frameId,
      html: updatedHTML,
      order: frameOrder,
    });
  }
};

export const highlightElement = (event: MouseEvent, isHotspotMode: boolean) => {
    if (!isHotspotMode) return;
    const target = event.target as HTMLElement;
    target.style.outline = "2px solid red";
  };
  
  export const removeHighlight = (event: MouseEvent, isHotspotMode: boolean) => {
    if (!isHotspotMode) return;
    const target = event.target as HTMLElement;
    target.style.outline = "none";
  };
  
  export const handleDoubleClick = (
    event: MouseEvent,
    frameId: string,
    stateFrame: (frameId: string) => Promise<void>
  ) => {
    const target = event.target as HTMLElement;
  
    if (target && target.nodeType === Node.ELEMENT_NODE && !target.isContentEditable) {
      target.contentEditable = "true";
      target.focus();
  
      target.style.outline = "2px dashed #007bff";
      target.style.backgroundColor = "#f0f8ff";
  
      const saveChanges = async () => {
        target.contentEditable = "false";
        target.style.outline = "none";
        target.style.backgroundColor = "transparent";
        await stateFrame(frameId);
      };
  
      target.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          saveChanges();
        }
      });
  
      target.addEventListener("blur", saveChanges, { once: true });
    }
  };
  
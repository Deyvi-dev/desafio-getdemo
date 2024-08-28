export type Frame = {
    id: string;
    html: string;
    image: string;
    order: number;
  };
  
  export type FramePosition = {
    x: number;
    y: number;
    width: number;
    height: number;
    left: number;
    top: number;
    element: HTMLElement;
  };
  
import Draggable from 'react-draggable';
import { useTooltipStore } from '@/stores/tooltip';
import { useState, useEffect } from 'react';

export function DraggableTooltip() {
  const { tooltipPosition } = useTooltipStore();
  const offset = 30; 


  const [lineEndPosition, setLineEndPosition] = useState({
    x: tooltipPosition ? tooltipPosition.left + offset : 0,
    y: tooltipPosition ? tooltipPosition.top + offset : 0,
  });

  useEffect(() => {
 
    if (tooltipPosition) {
      setLineEndPosition({
        x: tooltipPosition.left + offset,
        y: tooltipPosition.top + offset,
      });
    }
  }, [tooltipPosition]);

  if (!tooltipPosition) return null;

  const handleDrag = (_e: any, data: { x: number; y: number; }) => {
  
    setLineEndPosition({
      x: data.x + offset,
      y: data.y + offset,
    });
  };

  
  const svgWidth = Math.abs(lineEndPosition.x - tooltipPosition.left);
  const svgHeight = Math.abs(lineEndPosition.y - tooltipPosition.top);
  const svgX = Math.min(lineEndPosition.x, tooltipPosition.left);
  const svgY = Math.min(lineEndPosition.y, tooltipPosition.top);

  return (
    <div className='absolute z-50'>
      <svg
        style={{
          position: 'absolute',
          left: svgX,
          top: svgY,
          width: svgWidth,
          height: svgHeight,
          pointerEvents: 'none',
          zIndex: 999,
        }}
      >
        <line
          x1={tooltipPosition.left - svgX} 
          y1={tooltipPosition.top - svgY}  
          x2={lineEndPosition.x - svgX} 
          y2={lineEndPosition.y - svgY}
          stroke="blue"
          strokeWidth="4"
        />
      </svg>

      <Draggable
        defaultPosition={{
          x: tooltipPosition.left + offset,
          y: tooltipPosition.top + offset,
        }}
        onDrag={handleDrag}
      >
        <div
          style={{
            padding: '10px',
            backgroundColor: 'blue',
            color: 'white',
            width: '400px',
            borderRadius: '5px',
            cursor: 'grab',
            userSelect: 'none',
          }}
        >
          <div>
            Vamos gravar uma demo! 🎥<br />
            Com a extensão Getdemo instalada no seu Chrome, inicie a gravação e navegue pelo seu software!
          </div>
        </div>
      </Draggable>
    </div>
  );
}

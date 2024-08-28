import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Mic, Image, Snowflake, MessageCircle, Target, Plus } from 'lucide-react'

interface TooltipItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface PlusToolsProps {
  onHotspotClick: () => void;
  onDraggableTooltipClick: () => void;
}

export function PlusTools({ onHotspotClick, onDraggableTooltipClick }: PlusToolsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const tooltipItems: TooltipItem[] = [
    { 
      icon: <Mic className="h-4 w-4" />, 
      label: "Gerar narração com IA", 
      onClick: () => console.log("Generate narration with AI")
    },
    { 
      icon: <Image className="h-4 w-4" />, 
      label: "Inserir imagem", 
      onClick: () => console.log("Insert image")
    },
    { 
      icon: <Snowflake className="h-4 w-4" />, 
      label: "Congelar estado", 
      onClick: () => console.log("Freeze state")
    },
    { 
      icon: <MessageCircle className="h-4 w-4" />, 
      label: "Inserir tooltip", 
      onClick: () =>{

      onDraggableTooltipClick()
      setIsOpen(false)
      }
    },
    { 
      icon: <Target className="h-4 w-4" />, 
      label: "Inserir hotspot", 
      onClick: () => {
        onHotspotClick()
        setIsOpen(false)
      }
    },
  ]

  return (
    <div className="flex flex-col absolute bottom-44 right-2 z-50 items-end space-y-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full right- p-2"  side="top" align="end">
          <div className="flex flex-col space-y-1 p-1">
            {tooltipItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="flex justify-start items-center space-x-2 w-full px-3 py-2 text-sm text-start"
                onClick={() => {
                  item.onClick()
                }}
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

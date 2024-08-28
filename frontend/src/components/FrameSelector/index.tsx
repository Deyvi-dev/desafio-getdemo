import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePreviewStore } from "@/stores/preview";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronDown, Eye, LogOut, Copy, Trash2, MoveVertical, Save } from "lucide-react";
import { useFrameStore } from "@/stores/frame";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";

type Frame = {
  id: string;
  html: string;
  image?: string;
};

export function FrameSelector({ frames }: { frames: Frame[] }) {
  const setSelectedFrame = useFrameStore((state) => state.setSelectedFrame);
  const removeFrame = useFrameStore((state) => state.removeFrame);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const previewMode = usePreviewStore((state) => state.previewMode);
  const setPreviewMode = usePreviewStore((state) => state.setPreviewMode);

  const saveAllFrames = async () => {
    setLoading(true);
    const frames = useFrameStore.getState().frames;
    const removedFrames = useFrameStore.getState().removedFrames;
  
    const framePromises = frames.map(async (frame) => {
      const response = await fetch(`http://localhost:3001/api/frames/${frame.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: frame.html }),
      });
      if (!response.ok) throw new Error(`Erro ao atualizar o frame ${frame.id}.`);

    });
  
    const removePromises = removedFrames.map(async (frameId) => {
      const response = await fetch(`http://localhost:3001/api/frames/${frameId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Erro ao remover o frame ${frameId}.`);
     
    });
  
    try {
      await Promise.all([...framePromises, ...removePromises]);
      toast({ title: "Salvo com sucesso", description: "Todos os frames foram salvos.", variant: "success" });
    } catch (error) {
      toast({ title: "Erro ao salvar", description: "Não foi possível salvar todos os frames.", variant: "destructive" });
      console.error("Erro ao salvar todos os frames", error);
    } finally {
      setTimeout(() => navigate('/'), 2000);
      setLoading(false);
      setOpen(false);
    }
  };
  

  return (
    <div className="fixed inset-x-0 bottom-0 bg-[#131d43] text-white flex flex-col">
      <Toaster />
      
      {!previewMode ? (
        <>
          <div className="overflow-x-auto scrollbar-hide bg-white bor py-2 px-4 border-b border">
            <div className="flex space-x-4">
              {frames.map((frame, index) => (
                <div
                  key={frame.id}
                  className="relative flex-shrink-0 w-36 h-24 cursor-pointer rounded-md overflow-hidden group"
                  onClick={() => setSelectedFrame(frame.id)}
                >
                  <img
                    src={"/assets/getDemoFrame1.png"}
                    alt={`Frame ${index + 1}`}
                    className="w-full h-full object-cover"
                   
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-medium">{`Frame ${index + 1}`}</span>
                  </div>
                  <div className="absolute top-1 right-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 bg-white bg-opacity-20 hover:bg-opacity-30"
                            onClick={() => removeFrame(frame.id)} // Usar a função de remoção
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Remover</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Demo</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white bg-yellow-500 hover:bg-yellow-600">
                    Em desenvolvimento <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Opção 1</DropdownMenuItem>
                  <DropdownMenuItem>Opção 2</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-white" onClick={() => setPreviewMode(true)}>
                <Eye className="mr-2 h-4 w-4" />
                Visualizar
              </Button>
              <Button variant="ghost" size="icon" className="text-white" onClick={() => navigate('/')}>
                <LogOut className="h-4 w-4" />
              </Button>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm" className="bg-green-500 hover:bg-green-600">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Salvar a demo</DialogTitle>
                    <DialogDescription>
                      Clique no botão abaixo para salvar a demo.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button type="submit" onClick={saveAllFrames}>
                      {loading ? (
                        <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></span>
                      ) : (
                        "Salvar todos os frames"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="default" size="sm" className="bg-blue-500 hover:bg-blue-600" onClick={() => navigate('/')}>
                Sair
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white">
                      <MoveVertical className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mais opções</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center p-4">
          <Button variant="ghost" size="sm" className="text-white" onClick={() => setPreviewMode(false)}>
            Voltar
          </Button>
        </div>
      )}
    </div>
  );
}

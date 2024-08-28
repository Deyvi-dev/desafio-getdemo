import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Share2, Clock, Edit, Trash2, LayoutGrid, List } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { LoadingSpinner } from '../LoadingSpinner';
type Demo = {
  id: string;
  title: string;
  status: string;
  views: number;
  image: string;
};

export default function Demos({ initialDemos }: { initialDemos: Demo[] }) {
  const [demos, setDemos] = useState<Demo[]>(initialDemos);
  const [isGridView, setIsGridView] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const handleEditClick = (id: string) => {
    window.location.href = `/demo/${id}`;
  };

  const handleDeleteClick = (id: string) => {
    setLoading(true);
  
    fetch(`http://localhost:3001/api/demos/${id}`, { method: "DELETE" })
      .then(response => {
        if (!response.ok) throw new Error('Erro ao excluir o item');
        setDemos(prevDemos => prevDemos.filter(demo => demo.id !== id));
        toast({
          title: 'Item excluído',
          description: 'O item foi excluído com sucesso.',
          variant: 'success',
        });
      })
      .catch(error => {
        toast({
          title: 'Erro ao excluir o item',
          description: 'Não foi possível excluir o item.',
          variant: 'destructive',
        });
        console.error("Erro ao excluir o item:", error.message);
      })
      .finally(() => setLoading(false));
  };
  

  return (
    <>
    <Toaster />
  
      {loading && <LoadingSpinner/>}

      <div className="mb-8">
        <div className="flex justify-end items-center mb-2">
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={() => setIsGridView(true)}>
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setIsGridView(false)}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className={`grid gap-6 ${isGridView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
        {demos.map((demo) => (
          <Card key={demo.id} className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <img src='assets/getDemoFrame1.png' alt={demo.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="text-white mr-2 hover:bg-white hover:bg-opacity-20" onClick={() => handleEditClick(demo.id)}>
                    <Edit className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white hover:bg-opacity-20" onClick={() => handleDeleteClick(demo.id)}>
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
                <Badge className="absolute top-2 right-2" variant={demo.status === "Público" ? "default" : "secondary"}>
                  {demo.status}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-700 mb-2 truncate">{demo.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>Visualizações</span>
                  </div>
                  <span>{demo.views}</span>
                </div>
                <div className="flex justify-between items-center">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 p-0">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-xs">Histórico</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 p-0">
                    <Share2 className="w-4 h-4 mr-1" />
                    <span className="text-xs">Compartilhar</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

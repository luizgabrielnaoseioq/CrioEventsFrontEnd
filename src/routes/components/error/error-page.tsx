import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, SquareArrowUpLeft } from "lucide-react";

export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-4 text-center bg-gray-900">
      <AlertTriangle className="w-16 h-16 text-amber-400 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Algo deu errado</h1>
      <p className="text-muted-foreground mb-6">
        Não conseguimos carregar essa página. Tente novamente ou volte ao início.
      </p>
      <Button onClick={() => navigate("/")} variant="default" className="flex items-center gap-2">
        <SquareArrowUpLeft />
        Voltar para o início
      </Button>
    </div>
  );
}

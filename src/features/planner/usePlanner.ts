import { useParams } from "next/navigation";
import { toast } from "sonner";
import { generatePlannerService } from "./planner.service";
import { useState } from "react";

export function usePlanner() {
  const params = useParams<{ id: string }>();
  const concursoId = params.id;

  const [planner, setPlanner] = useState(null);
  const [loading, setLoading] = useState(false);

  const generatePlanner = async () => {
    try {
      setLoading(true);
      const data = await generatePlannerService(concursoId);
      setPlanner(data);
      toast.success("Cronograma gerado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro interno no servidor");
        console.error("Erro ao gerar cronograma", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    planner,
    loading,
    generatePlanner,
  };
}
import { ConcursoDTO, IConcurso } from "@/src/types/concurso";
import { useCallback, useEffect, useState } from "react";
import {
  createConcursoService,
  getAllConcursoService,
} from "./concurso.service";
import { toast } from "sonner";

export default function useConcurso() {
  const [loading, setLoading] = useState<boolean>(false);
  const [concursoRequest, setConcursoRequest] = useState<ConcursoDTO>({
    name: "",
    date: "",
    examining_board: "",
    weekly_hours: 0
  });

  const [concursoList, setConcursoList] = useState<IConcurso[]>([]);

  const handleChangeConcurso = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setConcursoRequest((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const getAllConcurso = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllConcursoService();
      setConcursoList(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro interno no servidor");
        console.log("Erro ao criar concurso", error);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllConcurso().catch(() => {});
  }, [getAllConcurso]);

  const createConcurso = async () => {
    try {
      setLoading(true);
      await createConcursoService({
        name: concursoRequest.name,
        date: concursoRequest.date,
        examining_board: concursoRequest.examining_board,
        weekly_hours: concursoRequest.weekly_hours
      });
      await getAllConcurso();
      toast.success("Concurso criado com sucesso");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro interno no servidor");
        console.log("Erro ao criar concurso", error);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    concursoRequest,
    handleChangeConcurso,
    createConcurso,
    concursoList,
  };
}

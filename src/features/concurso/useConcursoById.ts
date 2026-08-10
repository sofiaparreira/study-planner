import { IConcurso } from "@/src/types/concurso";
import { useCallback, useEffect, useState } from "react";
import { getConcursoByIdService } from "./concurso.service";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export default function useConcursoById() {
  const [loading, setLoading] = useState<boolean>(false);
  const [concurso, setConcurso] = useState<IConcurso>();
  const [subjectList, setSubjectList] = useState();
  const [subject, setSubject] = useState();
  const params = useParams<{ id: string }>();
  const concursoId = params.id;

  const getConcursoById = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getConcursoByIdService(concursoId);

      setConcurso(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro interno no servidor");
        console.error("Erro ao buscar concurso:", error);
      }
    } finally {
      setLoading(false);
    }
  }, [concursoId]);

  useEffect(() => {
    getConcursoById();
  }, [getConcursoById]);
  return {
    loading,
    concurso,
  };
}

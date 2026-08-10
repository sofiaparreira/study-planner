import { SubjectDTO } from "@/src/types/subject";
import React, { useState } from "react";
import { createSubjectService } from "./subject.service";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export function useSubject() {
  const params = useParams<{ id: string }>();
  const concursoId = params.id;
  console.log('id', concursoId)

  const [subject, setSubject] = useState<SubjectDTO>({
    name: "",
    quantity_questions: 0,
    points_per_questions: 0,
  });

  const handleChangeSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setSubject((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value
    }))
  }

  const createSubject = async () => {
    try {
      await createSubjectService(concursoId, {
        name: subject?.name,
        quantity_questions: subject?.quantity_questions,
        points_per_questions: subject?.points_per_questions,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro interno no servidor");
        console.log("Erro ao criar concurso", error);
      }
      throw error;
    }
  };

  return {
    handleChangeSubject,
    subject,
    createSubject,
    concursoId
  };
}

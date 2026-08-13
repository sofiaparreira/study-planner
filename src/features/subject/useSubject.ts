import { ISubject, SubjectDTO, TopicDTO } from "@/src/types/subject";
import React, { useCallback, useEffect, useState } from "react";
import { createSubjectService, getSubjectService } from "./subject.service";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "../auth/useAuth";

export function useSubject() {
  const params = useParams<{ id: string }>();
  const concursoId = params.id;
  const { authenticated } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [subjectList, setSubjectList] = useState<ISubject[]>([]);
  const [subject, setSubject] = useState<SubjectDTO>({
    name: "",
    quantity_questions: 0,
    points_per_questions: 0,
    topics: [],
  });
  const [topic, setTopic] = useState<TopicDTO>({
    name: "",
  });

  const [topicList, setTopicList] = useState<TopicDTO[]>([]);

  const getSubjects = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getSubjectService(concursoId);
      setSubjectList(data);
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
  }, [concursoId]);

  useEffect(() => {
    if (!authenticated) return;
    getSubjects();
  }, [authenticated, getSubjects]);

  const handleChangeSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setSubject((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleChangeTopic = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setTopic((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };
  console.log('topic', topicList)

  const createSubject = async () => {
    try {
      await createSubjectService(concursoId, {
        name: subject?.name,
        quantity_questions: subject?.quantity_questions,
        points_per_questions: subject?.points_per_questions,
        topics: topicList,
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

 const addTopic = (name: string) => {
  setTopicList((prev) => [...prev, { name }]);

  setTopic((prev) => ({
    ...prev,
    name: "",
  }));
};

  return {
    handleChangeSubject,
    handleChangeTopic,
    subject,
    topic,
    topicList,
    addTopic,
    createSubject,
    concursoId,
    subjectList,
  };
}

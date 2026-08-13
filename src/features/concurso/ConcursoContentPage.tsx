"use client";

import { ButtonDefault } from "@/src/components/ButtonDefault";
import { NewSubjectModal } from "../subject/NewSubjectModal";
import useConcursoById from "./useConcursoById";
import { useSubject } from "../subject/useSubject";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileQuestion,
  Plus,
  Sparkles,
  Target,
} from "lucide-react";
import { useState } from "react";
import { usePlanner } from "../planner/usePlanner";

const mockSchedule = [
  {
    day: "Segunda",
    date: "12 Ago",
    subjects: [
      {
        name: "Matemática",
        topics: ["Matrizes", "Cálculo Numérico"],
        duration: "1h 30min",
        questions: 20,
      },
      {
        name: "Português",
        topics: ["Interpretação de Texto"],
        duration: "1h",
        questions: 15,
      },
    ],
  },
  {
    day: "Terça",
    date: "13 Ago",
    subjects: [
      {
        name: "Direito Constitucional",
        topics: ["Direitos Fundamentais"],
        duration: "1h 30min",
        questions: 20,
      },
      {
        name: "Matemática",
        topics: ["Determinantes"],
        duration: "1h",
        questions: 15,
      },
    ],
  },
  {
    day: "Quarta",
    date: "14 Ago",
    subjects: [
      {
        name: "Português",
        topics: ["Gramática"],
        duration: "1h 30min",
        questions: 20,
      },
    ],
  },
  {
    day: "Quinta",
    date: "15 Ago",
    subjects: [
      {
        name: "Direito Administrativo",
        topics: ["Atos Administrativos"],
        duration: "1h 30min",
        questions: 20,
      },
      {
        name: "Matemática",
        topics: ["Matrizes"],
        duration: "1h",
        questions: 15,
      },
    ],
  },
  {
    day: "Sexta",
    date: "16 Ago",
    subjects: [
      {
        name: "Português",
        topics: ["Interpretação de Texto"],
        duration: "1h",
        questions: 15,
      },
    ],
  },
];

export function ConcursoContentPage() {
  const { concurso } = useConcursoById();

  const {
    handleChangeSubject,
    handleChangeTopic,
    subject,
    createSubject,
    subjectList,
    topic,
    addTopic,
    topicList,
  } = useSubject();

  const {
    planner,
    loading,
    generatePlanner
  } = usePlanner();

  const [isOpenSubjectModal, setIsOpenSubjectModal] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const toggleSubjectModal = () => {
    setIsOpenSubjectModal((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <section className="mb-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <CalendarDays size={16} />
                Meu concurso
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {concurso?.name}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Organize suas disciplinas e monte seu cronograma de estudos.
              </p>
            </div>

            <ButtonDefault onClick={toggleSubjectModal}>
              <Plus size={18} />
              Adicionar disciplina
            </ButtonDefault>
          </div>
        </section>
        {/* Gerar cronograma */}
        {subjectList.length > 0 && !showSchedule && (
          <section className="mb-8 overflow-hidden rounded-2xl bg-emerald-900 px-6 py-5 text-white">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Sparkles size={19} />
                </div>

                <div>
                  <h2 className="text-lg font-bold">
                    Seu cronograma precisa ser atualizado
                  </h2>

                  <p className="mt-1 text-sm text-emerald-100">
                    Você alterou suas disciplinas. Gere novamente o cronograma
                    para aplicar as mudanças.
                  </p>
                </div>
              </div>

              <ButtonDefault onClick={generatePlanner} className="shrink-0 bg-white text-emerald-900!">
                <Sparkles size={17} />
                Gerar
              </ButtonDefault>
            </div>
          </section>
        )}

        {/* Disciplinas */}
        <section className="mb-8">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Suas disciplinas
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Adicione todas as disciplinas que fazem parte da sua preparação.
              </p>
            </div>
          </div>

          {subjectList.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <button type="button" onClick={toggleSubjectModal} className="cursor-pointer mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200  text-gray-400 hover:text-gray-800 duration-300">
                <Plus size={22} />
              </button>

              <h3 className="font-semibold text-slate-900">
                Nenhuma disciplina adicionada
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Comece adicionando as disciplinas que você precisa estudar para
                este concurso.
              </p>

              <div className="mt-5">
               
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {subjectList.map((subject) => (
                <div
                  key={subject.id}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {subject.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {subject.quantity_questions} questões
                      </p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Target size={18} />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-xs text-slate-400">
                        Pontos por questão
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {subject.points_per_questions}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-slate-400">Subdisciplinas</p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {subject.topics?.length ?? 0}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Cronograma */}
        {showSchedule && (
          <section>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">
                    Seu cronograma
                  </h2>

                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    Gerado
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Uma visão da sua rotina de estudos para esta semana.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowSchedule(false)}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Editar disciplinas
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
              {mockSchedule.map((day) => (
                <div
                  key={day.day}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="mb-4 border-b border-slate-100 pb-4">
                    <p className="text-sm font-semibold text-slate-900">
                      {day.day}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">{day.date}</p>
                  </div>

                  <div className="space-y-3">
                    {day.subjects.map((item, index) => (
                      <div
                        key={`${item.name}-${index}`}
                        className="rounded-xl bg-slate-50 p-3"
                      >
                        <div className="flex items-start gap-2">
                          <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />

                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-800">
                              {item.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {item.topics.join(" • ")}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock3 size={13} />
                            {item.duration}
                          </span>

                          <span className="flex items-center gap-1">
                            <FileQuestion size={13} />
                            {item.questions}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Resumo */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={20} />
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    Semana organizada
                  </p>

                  <p className="text-sm text-slate-500">
                    Seu cronograma distribui as disciplinas ao longo da semana.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Modal */}
      {isOpenSubjectModal && (
        <NewSubjectModal
          createSubject={createSubject}
          subject={subject}
          handleChangeSubject={handleChangeSubject}
          toggleSubjectModal={toggleSubjectModal}
          handleChangeTopic={handleChangeTopic}
          topic={topic}
          addTopic={addTopic}
          topicList={topicList}
        />
      )}
    </div>
  );
}

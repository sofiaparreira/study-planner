import { getAuthenticatedUser } from "@/src/lib/auth";
import { addDays, getPlannerStartDate } from "@/src/lib/planner";
import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 },
      );
    }

    const { id } = await params;

    const concurso = await prisma.concurso.findFirst({
      where: {
        id,
        userId: user.id,
      },
      include: {
        subjects: {
          include: {
            topics: true,
          },
        },
      },
    });

    if (!concurso) {
      return NextResponse.json(
        { error: "Concurso não encontrado" },
        { status: 404 },
      );
    }

    if (concurso.weekly_hours <= 0) {
      return NextResponse.json(
        {
          error:
            "O concurso precisa ter horas semanais disponíveis para estudo definidas",
        },
        { status: 400 },
      );
    }

    if (concurso.subjects.length === 0) {
      return NextResponse.json(
        {
          error:
            "Cadastre pelo menos uma matéria neste concurso antes de gerar o cronograma",
        },
        { status: 400 },
      );
    }

    const subjectWithoutTopics = concurso.subjects.find(
      (subject) => subject.topics.length === 0,
    );

    if (subjectWithoutTopics) {
      return NextResponse.json(
        {
          error: `A matéria ${subjectWithoutTopics.name} precisa ter pelo menos uma submatéria`,
        },
        { status: 400 },
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const examDate = new Date(concurso.date);
    examDate.setHours(0, 0, 0, 0);

    if (examDate <= today) {
      return NextResponse.json(
        {
          error: "A data da prova deve ser posterior à data atual",
        },
        { status: 400 },
      );
    }

    const subjectsWithScore = concurso.subjects.map((subject) => {
      const score =
        subject.points_per_questions *
        subject.quantity_questions;

      return {
        ...subject,
        score,
      };
    });

    const totalScore = subjectsWithScore.reduce(
      (total, subject) => total + subject.score,
      0,
    );

    if (totalScore <= 0) {
      return NextResponse.json(
        {
          error:
            "As matérias precisam possuir quantidade de questões e pontos por questão válidos",
        },
        { status: 400 },
      );
    }

    const subjectsWithPriority = subjectsWithScore.map((subject) => ({
      ...subject,
      priority: subject.score / totalScore,
    }));

    const subjectsWithMinutes = subjectsWithPriority.map((subject) => ({
      ...subject,
      weeklyMinutes: Math.round(
        concurso.weekly_hours * 60 * subject.priority,
      ),
    }));

    const startDate = getPlannerStartDate(new Date());

    const weeks: {
      startDate: Date;
      endDate: Date;
    }[] = [];

    let currentWeekStart = new Date(startDate);

    while (currentWeekStart < examDate) {
      const weekEnd = addDays(currentWeekStart, 6);

      weeks.push({
        startDate: new Date(currentWeekStart),
        endDate:
          weekEnd > examDate
            ? new Date(examDate)
            : weekEnd,
      });

      currentWeekStart = addDays(currentWeekStart, 7);
    }

    const weeksWithItems = weeks.map((week, weekIndex) => {
      const items = subjectsWithMinutes.flatMap((subject) => {
        let remainingMinutes = subject.weeklyMinutes;

        const topics = subject.topics;

        let topicIndex = weekIndex % topics.length;

        const subjectItems: {
          subjectId: string;
          topicId: string;
          durationMinutes: number;
        }[] = [];

        while (remainingMinutes > 0) {
          const durationMinutes = Math.min(
            60,
            remainingMinutes,
          );

          const topic = topics[topicIndex];

          subjectItems.push({
            subjectId: subject.id,
            topicId: topic.id,
            durationMinutes,
          });

          remainingMinutes -= durationMinutes;

          topicIndex =
            (topicIndex + 1) % topics.length;
        }

        return subjectItems;
      });

      return {
        ...week,
        items,
      };
    });

    const planner = await prisma.$transaction(
      async (tx) => {
        await tx.planner.deleteMany({
          where: {
            concursoId: concurso.id,
          },
        });

        const newPlanner = await tx.planner.create({
          data: {
            concursoId: concurso.id,
            startDate,
            endDate: examDate,

            weeks: {
              create: weeksWithItems.map((week) => ({
                startDate: week.startDate,
                endDate: week.endDate,

                items: {
                  create: week.items,
                },
              })),
            },
          },

          include: {
            weeks: {
              orderBy: {
                startDate: "asc",
              },

              include: {
                items: {
                  include: {
                    subject: true,
                    topic: true,
                  },
                },
              },
            },
          },
        });

        return newPlanner;
      },
    );

    return NextResponse.json(
      planner,
      { status: 201 },
    );
  } catch (error) {
    console.error(
      "Erro ao gerar cronograma:",
      error,
    );

    return NextResponse.json(
      {
        error: "Erro interno do servidor",
      },
      { status: 500 },
    );
  }
}
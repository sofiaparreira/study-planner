/*
  Warnings:

  - Added the required column `updatedAt` to the `Concurso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Concurso" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Planner" (
    "id" TEXT NOT NULL,
    "concursoId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Planner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlannerWeek" (
    "id" TEXT NOT NULL,
    "plannerId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlannerWeek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlannerItem" (
    "id" TEXT NOT NULL,
    "plannerWeekId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlannerItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Planner_concursoId_key" ON "Planner"("concursoId");

-- CreateIndex
CREATE INDEX "PlannerWeek_plannerId_idx" ON "PlannerWeek"("plannerId");

-- CreateIndex
CREATE INDEX "PlannerItem_plannerWeekId_idx" ON "PlannerItem"("plannerWeekId");

-- CreateIndex
CREATE INDEX "PlannerItem_subjectId_idx" ON "PlannerItem"("subjectId");

-- CreateIndex
CREATE INDEX "PlannerItem_topicId_idx" ON "PlannerItem"("topicId");

-- AddForeignKey
ALTER TABLE "Planner" ADD CONSTRAINT "Planner_concursoId_fkey" FOREIGN KEY ("concursoId") REFERENCES "Concurso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannerWeek" ADD CONSTRAINT "PlannerWeek_plannerId_fkey" FOREIGN KEY ("plannerId") REFERENCES "Planner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannerItem" ADD CONSTRAINT "PlannerItem_plannerWeekId_fkey" FOREIGN KEY ("plannerWeekId") REFERENCES "PlannerWeek"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannerItem" ADD CONSTRAINT "PlannerItem_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannerItem" ADD CONSTRAINT "PlannerItem_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

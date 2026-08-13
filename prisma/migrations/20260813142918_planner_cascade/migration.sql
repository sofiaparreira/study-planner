-- DropForeignKey
ALTER TABLE "Planner" DROP CONSTRAINT "Planner_concursoId_fkey";

-- AddForeignKey
ALTER TABLE "Planner" ADD CONSTRAINT "Planner_concursoId_fkey" FOREIGN KEY ("concursoId") REFERENCES "Concurso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

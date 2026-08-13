-- DropForeignKey
ALTER TABLE "PlannerWeek" DROP CONSTRAINT "PlannerWeek_plannerId_fkey";

-- AddForeignKey
ALTER TABLE "PlannerWeek" ADD CONSTRAINT "PlannerWeek_plannerId_fkey" FOREIGN KEY ("plannerId") REFERENCES "Planner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

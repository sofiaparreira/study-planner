/*
  Warnings:

  - Made the column `points_per_questions` on table `Subject` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quantity_questions` on table `Subject` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "points_per_questions" SET NOT NULL,
ALTER COLUMN "quantity_questions" SET NOT NULL;

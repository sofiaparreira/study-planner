/*
  Warnings:

  - You are about to drop the column `pointsPerQuestion` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `quantityQuestions` on the `Subject` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "pointsPerQuestion",
DROP COLUMN "quantityQuestions",
ADD COLUMN     "points_per_questions" INTEGER,
ADD COLUMN     "quantity_questions" INTEGER;

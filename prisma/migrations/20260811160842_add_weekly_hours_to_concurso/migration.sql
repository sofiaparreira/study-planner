/*
  Warnings:

  - Added the required column `weekly_hours` to the `Concurso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Concurso" ADD COLUMN     "weekly_hours" INTEGER NOT NULL;

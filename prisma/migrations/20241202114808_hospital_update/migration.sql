/*
  Warnings:

  - A unique constraint covering the columns `[register]` on the table `Hospital` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Hospital" ADD COLUMN     "register" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "totalSit" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_register_key" ON "Hospital"("register");

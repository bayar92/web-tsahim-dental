/*
  Warnings:

  - A unique constraint covering the columns `[domainName]` on the table `Hospital` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Hospital" ALTER COLUMN "domainName" DROP NOT NULL,
ALTER COLUMN "domainName" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_domainName_key" ON "Hospital"("domainName");

/*
  Warnings:

  - A unique constraint covering the columns `[domainName]` on the table `Hospital` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Hospital_domainName_key" ON "Hospital"("domainName");

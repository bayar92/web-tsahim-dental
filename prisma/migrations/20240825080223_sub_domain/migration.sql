/*
  Warnings:

  - You are about to drop the column `domainName` on the `Hospital` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subDomain]` on the table `Hospital` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Hospital_domainName_key";

-- AlterTable
ALTER TABLE "Hospital" DROP COLUMN "domainName",
ADD COLUMN     "subDomain" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_subDomain_key" ON "Hospital"("subDomain");

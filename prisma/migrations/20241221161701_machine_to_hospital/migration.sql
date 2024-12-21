/*
  Warnings:

  - You are about to drop the column `subscriptionId` on the `Machine` table. All the data in the column will be lost.
  - Added the required column `hospitalId` to the `Machine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Machine" DROP CONSTRAINT "Machine_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "Machine" DROP COLUMN "subscriptionId",
ADD COLUMN     "hospitalId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Machine" ADD CONSTRAINT "Machine_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

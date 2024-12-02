/*
  Warnings:

  - You are about to drop the column `isStart` on the `Subscription` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_hospitalId_fkey";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "hospitalId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "isStart",
ADD COLUMN     "isStarted" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

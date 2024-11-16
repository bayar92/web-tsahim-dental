/*
  Warnings:

  - You are about to drop the column `doctorProfileId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastRecommendedSpecialty` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "UserRole" ADD VALUE 'HOSPITAL_OWNER';
ALTER TYPE "UserRole" ADD VALUE 'HOSPITAL_USER';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "doctorProfileId",
DROP COLUMN "lastRecommendedSpecialty";

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hospitalId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

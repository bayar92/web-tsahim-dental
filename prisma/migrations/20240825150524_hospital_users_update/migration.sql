/*
  Warnings:

  - You are about to drop the column `passowrd` on the `HospitalUsers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HospitalUsers" DROP COLUMN "passowrd",
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "role" TEXT;

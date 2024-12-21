/*
  Warnings:

  - You are about to drop the column `hospitalId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductVariant" ALTER COLUMN "unit" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hospitalId";

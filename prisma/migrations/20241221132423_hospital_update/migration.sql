/*
  Warnings:

  - Added the required column `ipAddress` to the `Machine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hospitalId` to the `ProductPayment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hospital" ALTER COLUMN "register" DROP NOT NULL,
ALTER COLUMN "register" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Machine" ADD COLUMN     "ipAddress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductPayment" ADD COLUMN     "hospitalId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductPayment" ADD CONSTRAINT "ProductPayment_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

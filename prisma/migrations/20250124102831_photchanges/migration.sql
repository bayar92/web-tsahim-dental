/*
  Warnings:

  - Added the required column `hospitalUserKey` to the `PhotoUploadToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PhotoUploadToken" ADD COLUMN     "hospitalUserKey" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PhotoUpload" (
    "id" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "photoTokenId" TEXT NOT NULL,
    "isSynced" BOOLEAN NOT NULL DEFAULT false,
    "syncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhotoUpload_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PhotoUpload" ADD CONSTRAINT "PhotoUpload_photoTokenId_fkey" FOREIGN KEY ("photoTokenId") REFERENCES "PhotoUploadToken"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

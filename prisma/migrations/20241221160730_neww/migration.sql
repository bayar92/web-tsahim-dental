-- AlterTable
ALTER TABLE "Machine" ADD COLUMN     "machineIps" TEXT[],
ADD COLUMN     "os" JSONB;

-- CreateTable
CREATE TABLE "MachinePing" (
    "id" TEXT NOT NULL,
    "machineId" INTEGER NOT NULL,
    "pingDate" TIMESTAMP(3) NOT NULL,
    "pingStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MachinePing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MachinePing" ADD CONSTRAINT "MachinePing_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

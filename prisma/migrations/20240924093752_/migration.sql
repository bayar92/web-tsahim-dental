-- CreateTable
CREATE TABLE "FreeTrial"
(
    "id" TEXT NOT NULL,
    "hospitalName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "hospitalChair" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "directorInfo" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FreeTrial_pkey" PRIMARY KEY ("id")
);

-- CreateEnum
CREATE TYPE "RepeatFrequency" AS ENUM ('ONE_TIME', 'DAILY', 'WEEKLY');

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "web" BOOLEAN NOT NULL DEFAULT false,
    "ios" BOOLEAN NOT NULL DEFAULT false,
    "android" BOOLEAN NOT NULL DEFAULT false,
    "topics" TEXT NOT NULL DEFAULT '',
    "jobLink" TEXT NOT NULL DEFAULT '',
    "users" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "isScheduled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "targetType" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "recipientTz" INTEGER NOT NULL DEFAULT 0,
    "scheduledTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scheduleEndDt" TIMESTAMP(3),
    "lastExecutedDate" TIMESTAMP(3),
    "repeatFrequency" "RepeatFrequency",
    "repeatInterval" INTEGER,
    "buildData" JSONB,
    "publishedDate" TIMESTAMP(3),
    "hospitalId" TEXT,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhotoUploadToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "PhotoUploadToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhotoUploadToken" ADD CONSTRAINT "PhotoUploadToken_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

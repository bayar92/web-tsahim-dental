-- AlterTable
ALTER TABLE "Machine" ADD COLUMN     "encryptionKey" JSONB,
ADD COLUMN     "subscriptionEndDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "isStart" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "totalDays" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ProductPayment" (
    "id" TEXT NOT NULL,
    "paidSource" TEXT,
    "paidAmount" DECIMAL(65,30),
    "paidDate" TIMESTAMP(3),
    "additionalNote" TEXT NOT NULL DEFAULT '',
    "productId" TEXT NOT NULL,
    "productVariantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paymentStatus" TEXT NOT NULL,

    CONSTRAINT "ProductPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QPayInvoice" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productVariantId" TEXT NOT NULL,
    "invoiceData" JSONB,
    "userId" TEXT,
    "payedDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QPayInvoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductPayment" ADD CONSTRAINT "ProductPayment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPayment" ADD CONSTRAINT "ProductPayment_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPayment" ADD CONSTRAINT "ProductPayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QPayInvoice" ADD CONSTRAINT "QPayInvoice_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QPayInvoice" ADD CONSTRAINT "QPayInvoice_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QPayInvoice" ADD CONSTRAINT "QPayInvoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

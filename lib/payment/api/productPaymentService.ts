import { prisma } from "@api/prisma";
import { updateSubscription } from "@lib/subscription/api/subscriptionService";

export const createProductPaymentAfterQpay = async (productPayment: any) => {
    await prisma.productPayment.create({
        data: productPayment,
    });
    await updateSubscription(productPayment.hospitalId, productPayment.productVariantId);
};

export const getHospitalPaymentHistory = async (hospitalId: string) => {
    const productPayments = await prisma.productPayment.findMany({
        where: { hospitalId },
        include: {
            ProductVariant: true,
        },
    });
    return productPayments;
};

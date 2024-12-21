import { prisma } from "@api/prisma";

export const updateSubscription = async (hospitalId: string, productVariantId: string) => {
    const productVariant = await prisma.productVariant.findUnique({
        where: { id: productVariantId },
        select: { duration: true }
    });

    if (!productVariant) return;

    const subscription = await prisma.subscription.findFirst({
        where: { hospitalId },
        select: { id: true, endDate: true }
    });


    if (subscription) {
        const dateToCalc = subscription.endDate && subscription.endDate > new Date()
            ? subscription.endDate
            : new Date();
        console.log("dateToCalc", dateToCalc);
        await prisma.subscription.update({
            where: { id: subscription.id },
            data: { endDate: calculateEndDate(dateToCalc, productVariant.duration) }
        });
    } else {
        const now = new Date();
        console.log("now", now);
        await prisma.subscription.create({
            data: {
                hospitalId,
                isStarted: true,
                startDate: now,
                endDate: calculateEndDate(now, productVariant.duration)
            }
        });
    }
};
const calculateEndDate = (baseDate: Date, durationMonths: number) => {
    const extendedMonth = new Date(
        baseDate.getFullYear(),
        baseDate.getMonth() + durationMonths,
        baseDate.getDate()
    );
    // Subtract one day to get end of previous month
    return new Date(extendedMonth.getTime());
};

export const getSubscription = async (hospitalId: string) => {
    const subscription = await prisma.subscription.findFirst({
        where: { hospitalId },
    });
    return subscription;
};
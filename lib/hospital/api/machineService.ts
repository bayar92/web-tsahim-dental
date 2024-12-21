import { prisma } from "@api/prisma";

export const getHospitalsMachines = async (userId: string) => {
    const machines = await prisma.machine.findMany({
        where: {
            hospital: {
                userId
            }
        },
        include: {
            machinePing: true,
            hospital: true
        }
    });
    return machines;
}
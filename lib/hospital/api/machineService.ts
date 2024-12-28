import { prisma } from "@api/prisma";
import { AppError } from "@util/errors";
const crypto = require("crypto");
import { getHospitalById } from "./service";

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

export const getMachineById = async (machineId: string, userId: string) => {
    const machine = await prisma.machine.findUnique({
        where: {
            machineUniqueId: machineId,
        }
    });
    return machine;
}
export const createMachine = async (machineId: string,
    machineName: string,
    userId: string,
    ipAddress: string,
    os: string) => {
    const hospital = await getHospitalById(userId);
    const encKey = createEncryptionKey();

    if (!hospital) throw AppError.NotFound("hospital.not-found");

    const machine = await prisma.machine.create({
        data: {
            machineUniqueId: machineId,
            machineName,
            hospitalId: hospital.id,
            ipAddress,
            machineIps: [ipAddress],
            os: JSON.parse(os),
            encryptionKey: encKey
        }
    });
    return {};
}
export const createEncryptionKey = () => {
    return {
        iv: crypto.randomBytes(16).toString("hex"),
        key: crypto.randomBytes(32).toString("hex"),
    };
};

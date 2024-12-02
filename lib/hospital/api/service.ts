import { prisma } from "@api/prisma";
import { Hospital } from "@prisma/client";
import { HospitalRegistrationFormType } from "../ui/HospitalRegistrationForm";

export const getHospitalPublicInfo = async (hospitalDomain: string) => {
  // const hospital = await prisma.hospital.findFirst({
  //   where: {
  //     subDomain: hospitalDomain,
  //   },
  //   select: {
  //     name: true,
  //     id: true,
  //   },
  // });
  return {};
};
export const getHospitalByName = async (hospitalName: string) => {
  const hospital = await prisma.hospital.findFirst({
    where: {
      name: hospitalName,
    },
    select: {
      name: true,
      id: true,
    },
  });
  return hospital;
};
export const getMyHospital = async (userId: string) => {
  const hospital = await prisma.hospital.findFirst({
    where: {
      userId,
    },
  });
  return hospital;
};

export const createHospital = async (
  hospital: HospitalRegistrationFormType,
  userId: string
) => {
  const newHospital = await prisma.hospital.create({
    data: {
      userId,
      name: hospital.name,
      phoneNumber: hospital.phoneNumber,
      totalSit: Number.parseInt(hospital.totalSit.toString()),
      register: hospital.register,
      directorInfo: hospital.directorInfo,
    },
  });
  return newHospital;
};

export const updateHospital = async (
  hospital: HospitalRegistrationFormType,
  userId: string
) => {
  const newHospital = await prisma.hospital.update({
    where: {
      id: hospital.id,
    },
    data: {
      userId,
      name: hospital.name,
      phoneNumber: hospital.phoneNumber,
      totalSit: Number.parseInt(hospital.totalSit.toString()),
      register: hospital.register,
      directorInfo: hospital.directorInfo,
    },
  });
  return newHospital;
};

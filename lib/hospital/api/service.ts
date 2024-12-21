import { prisma } from "@api/prisma";
import { Hospital } from "@prisma/client";
import { AppError } from "@util/errors";
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
      name: hospital.name || undefined,
      phoneNumber: hospital.phoneNumber,
      totalSit: hospital.totalSit ? Number.parseInt(hospital.totalSit.toString()) : undefined,
      register: hospital.register,
      directorInfo: hospital.directorInfo,
    },
  });
  return newHospital;
};
export const updateHospitalLogo = async (logoUrl: string, userId: string) => {
  const myHospital = await getMyHospital(userId);
  if (!myHospital) throw AppError.NotFound("Hospital not found");
  const newHospital = await prisma.hospital.update({
    where: {
      id: myHospital.id,
    },
    data: {
      hospitalLogo: logoUrl,
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
      totalSit: hospital.totalSit ? Number.parseInt(hospital.totalSit.toString()) : undefined,
      register: hospital.register,
      directorInfo: hospital.directorInfo,
    },
  });
  return newHospital;
};

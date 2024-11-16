import { prisma } from "@api/prisma";

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

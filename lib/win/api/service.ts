import { prisma } from "@api/prisma";
import { getCurrentDate } from "@api/currentDate";
import { AppError } from "@util/errors";

export const createPhotoUploadToken = async (hospitalId: string, hospitalUserKey: string) => {
  const token = await checkPhotoUploadToken(hospitalId, hospitalUserKey);
  if (token) {
    return token;
  }
  const currentDate = getCurrentDate(); //3 hours from current date
  const expiresAt = new Date(currentDate.getTime() + (3 * 60 * 60 * 1000));
  return prisma.photoUploadToken.create({
    data: {
      hospitalId,
      expiresAt,
      createdBy: "system",
      hospitalUserKey,
    },
  });
};
export const checkPhotoUploadToken = async (hospitalId: string, hospitalUserKey: string) => {
  const token = await prisma.photoUploadToken.findFirst({
    where: { hospitalId, hospitalUserKey },
  });

  if (!token || token.expiresAt < new Date()) {
    return "";
  }
  return token;
};
export const savePhotoLink = async (photoUrl: string, tokenId: string) => {
  await prisma.photoUpload.create({
    data: { photoUrl, photoTokenId: tokenId },
  });
  return {}
};

import { getCurrentDate } from "@api/currentDate";
import { sendMessageViaTelcocom } from "@api/messages/telcocom";
import { prisma } from "@api/prisma";

export const checkToken = async (token: string) => {
  return true;
};

export const createMessage = async (
  phoneNumber: string,
  message: string,
  hospitalId: string
) => {
  const newMessage = await prisma.message.create({
    data: {
      phoneNumber,
      message,
      hospitalId,
      createdAt: getCurrentDate(),
    },
    select: { id: true },
  });
  await sendMessageViaTelcocom(newMessage.id, phoneNumber, message);
  return await prisma.message.findUnique({
    where: {
      id: newMessage.id,
    },
    select: { id: true, phoneNumber: true, message: true, createdAt: true },
  });
};

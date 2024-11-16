import { createHandler } from "@api/handler";
import { prisma } from "@api/prisma";

const handler = createHandler();

handler
  .get(async (req, res) => {
    const waitList = await prisma.freeTrial.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.sendSuccess(waitList);
  })
  .post(async (req, res) => {
    const {
      hospitalName,
      hospitalChair,
      registrationNumber,
      directorInfo,
      phoneNumber,
    } = req.body;
    await prisma.freeTrial.create({
      data: {
        hospitalName,
        hospitalChair,
        registrationNumber,
        directorInfo,
        phoneNumber,
      },
    });
    res.sendSuccess({});
  });

export default handler;

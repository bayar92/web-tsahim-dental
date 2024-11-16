import { createHandler } from "@api/handler";
import { prisma } from "@api/prisma";

const handler = createHandler();

handler
  .get(async (req, res) => {
    const waitList = await prisma.waitListPhoneNumber.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.sendSuccess(waitList);
  })
  .post(async (req, res) => {
    //get first 8 digit
    const phone = req.body.phoneNumber.toString().substring(0, 8);
    //get first 20 character of name
    const name = req.body.name.toString().substring(0, 20);
    await prisma.waitListPhoneNumber.create({
      data: {
        phoneNumber: phone,
        name: name + "," + req.body.hospitalName,
      },
    });
    res.sendSuccess({});
  });

export default handler;

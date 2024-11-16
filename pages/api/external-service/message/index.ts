import { createHandler } from "@api/handler";
import { checkToken, createMessage } from "@lib/message/api/service";
import { getUserList } from "@lib/user/api/service";
import { prisma } from "@api/prisma";
import { get } from "lodash";
import hospital from "pages/admin/hospital";
import { AppError } from "@util/errors";

const handler = createHandler();
handler.post(async (req, res) => {
  try {
    const { phoneNumber, messageBody, hospitalId } = req.body;
    res.sendSuccess(await createMessage(phoneNumber, messageBody, hospitalId));
  } catch (err) {
    res.sendError(err);
  }
});
handler.get(async (_req, res) => {
  try {
    const productVariant = await prisma.message.findMany({
      include: {
        hospital: true,
      },
    });
    if (!productVariant) throw AppError.NotFound();
    res.sendSuccess(productVariant);
  } catch (error) {
    res.sendError(error);
  }
});
export default handler;

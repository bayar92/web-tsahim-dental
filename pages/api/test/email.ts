import { resendSendEmailValidationCode } from "@api/email/resendService";
import { createHandler } from "@api/handler";
import { prisma } from "@api/prisma";

const handler = createHandler();

handler.get(async (req, res) => {
  await resendSendEmailValidationCode("boldmonuud@gmail.com", "123456");
  res.sendSuccess({});
});

export default handler;

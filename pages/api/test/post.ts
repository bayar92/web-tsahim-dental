import { resendSendEmailValidationCode } from "@api/email/resendService";
import { createHandler } from "@api/handler";
import { prisma } from "@api/prisma";

const handler = createHandler();

handler.post(async (req, res) => {

    res.sendSuccess({ success: true });
});

export default handler;

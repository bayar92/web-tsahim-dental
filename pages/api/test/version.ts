import { resendSendEmailValidationCode } from "@api/email/resendService";
import { createHandler } from "@api/handler";
import { prisma } from "@api/prisma";

const handler = createHandler();

handler.get(async (req, res) => {

    res.sendSuccess({ success: true, message: "version 1.0.0" });
});

export default handler;

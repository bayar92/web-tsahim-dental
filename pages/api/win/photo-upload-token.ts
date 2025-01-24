import { createHandler } from "@api/handler";
import { getWaitList } from "@lib/waitlist/api/service";
import { createPhotoUploadToken } from "@lib/win/api/service";
import { UserRole } from "@prisma/client";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.get(async (req, res) => {
    const { hospitalId, hospitalUserId } = req.query;
    const token = await createPhotoUploadToken(hospitalId as string, hospitalUserId as string);
    res.sendSuccess(token);
});

export default handler;

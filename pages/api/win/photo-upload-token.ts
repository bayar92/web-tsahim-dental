// pages/api/win/photo-upload-token.ts
import { createHandler } from "@api/handler";
import { createPhotoUploadToken } from "@lib/win/api/service";

const handler = createHandler();

handler.get(async (req, res) => {
    const { hospitalId, hospitalUserId } = req.query;
    const token = await createPhotoUploadToken(hospitalId as string, hospitalUserId as string);
    res.sendSuccess(token);
});

export default handler;

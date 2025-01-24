import { createHandler } from "@api/handler";
import { checkPatientPhoto } from "@lib/win/api/service";

const handler = createHandler();

handler.post(async (req, res) => {
    const { hospitalId, hospitalUserId } = req.body;
    res.sendSuccess(await checkPatientPhoto(hospitalId, hospitalUserId));
});

export default handler;

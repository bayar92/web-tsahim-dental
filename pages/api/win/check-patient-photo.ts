import { createHandler } from "@api/handler";
import { checkPatientPhoto } from "@lib/win/api/service";

const handler = createHandler();

handler.post(async (req, res) => {
    const { hospitalId, hospitalUserId } = req.body;
    const message = JSON.stringify(await checkPatientPhoto(hospitalId, hospitalUserId))
    return res.sendSuccess({ success: true, message: message });
});

export default handler;

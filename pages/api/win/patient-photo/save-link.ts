//pages/api/win/patient-photo/save-link.ts
import { createHandler } from "@api/handler";
import { savePhotoLink } from "@lib/win/api/service";

const handler = createHandler();

handler.post(async (req, res) => {
    const { photoUrl, tokenId } = req.body;
    console.log(photoUrl, tokenId);
    await savePhotoLink(photoUrl, tokenId);

    res.sendSuccess({});
});

export default handler;

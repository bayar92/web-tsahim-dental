

import { createHandler } from "@api/handler";
import {
    getHospitalPublicInfo,
    getMyHospital,
} from "@lib/hospital/api/service";
import { getSubscription } from "@lib/subscription/api/subscriptionService";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.get(async (req, res) => {
    if (!req.user) throw AppError.Unauthorized();

    let hospital = (req.user as any).hospital?.[0];
    if (!hospital) {
        hospital = await getMyHospital(req.user.id);
    }

    const subscription = await getSubscription(hospital.id);

    res.sendSuccess(subscription);
});

export default handler;

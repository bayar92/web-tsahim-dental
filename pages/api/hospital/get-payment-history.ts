

import { createHandler } from "@api/handler";
import {
    getMyHospital
} from "@lib/hospital/api/service";
import { getHospitalPaymentHistory } from "@lib/payment/api/productPaymentService";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.get(async (req, res) => {
    if (!req.user) throw AppError.Unauthorized();

    let hospital = (req.user as any).hospital?.[0];
    if (!hospital) {
        hospital = await getMyHospital(req.user.id);
    }

    const paymentHistory = await getHospitalPaymentHistory(hospital.id);

    res.sendSuccess(paymentHistory);
});

export default handler;

import { createHandler } from "@api/handler";
import { createInvoiceOnEDENTAL } from "@lib/payment/api/qpayService";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.post(async (req, res) => {
    try {
        if (!req.user) throw AppError.Unauthorized();
        const { paymentPlanId } = req.body;

        return res.sendSuccess(
            await createInvoiceOnEDENTAL(req.user.id, paymentPlanId)
        );
    } catch (e) {
        res.sendError(e);
    }
});

export default handler;

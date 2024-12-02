import { createHandler } from "@api/handler";
import { createInvoiceOnEdental } from "@lib/payment/api/qpayService";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    if (!req.user) throw AppError.Unauthorized();
    const { productVariantId } = req.body;

    return res.sendSuccess(
      await createInvoiceOnEdental(req.user.id, productVariantId)
    );
  } catch (e) {
    res.sendError(e);
  }
});

export default handler;

import { createHandler } from "@api/handler";
import {
  callPaymentCompletion,
  createInvoiceOnEdental,
} from "@lib/payment/api/qpayService";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.get(async (req, res) => {
  try {
    const { payment_id } = req.query;

    return res.sendSuccess(await callPaymentCompletion(payment_id as string));
  } catch (e) {
    res.sendError(e);
  }
});

export default handler;

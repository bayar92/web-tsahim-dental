import { createHandler } from "@api/handler";
import { getProductVariants } from "@lib/product/api/service";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.get(async (req, res) => {
  try {
    const productVariant = await getProductVariants();
    res.sendSuccess(productVariant);
  } catch (error) {
    res.sendError(error);
  }
});
export default handler;

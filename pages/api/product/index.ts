import { createHandler } from "@api/handler";
import { getProducts } from "@lib/product/api/service";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.get(async (req, res) => {
  try {
    const products = await getProducts();
    res.sendSuccess(products);
  } catch (error) {
    res.sendError(error);
  }
});
export default handler;

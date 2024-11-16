import { createHandler } from "@api/handler";
import { AppError } from "@util/errors";
import { prisma } from "@api/prisma";

const handler = createHandler();

handler.get(async (req, res) => {
  try {
    const productVariant = await prisma.productVariant.findMany();
    if (!productVariant) throw AppError.NotFound();
    res.sendSuccess(productVariant);
  } catch (error) {
    res.sendError(error);
  }
});
export default handler;

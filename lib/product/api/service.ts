import { prisma } from "@api/prisma";

export const getProductVariants = async () => {
  const productVariants = await prisma.productVariant.findMany({
    include: {
      Product: true,
    },
  });
  return productVariants;
};
export const getProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      ProductVariant: true,
    },
  });
  return products;
};

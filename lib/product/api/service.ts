import { prisma } from "@api/prisma";
import { QueryParamType } from "@ui/hooks/query-param";
import { AppError } from "@util/errors";

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
export const getProductVariantList = async (filter: QueryParamType) => {
  const size = Number(filter.size),
    page = Number(filter.page);

  if (size <= 0 || page <= 0)
    throw AppError.BadRequest("validation.paging.size");
  const filters: any | any[] = [];
  if (filter.text) {
    const fText = { contains: filter.text, mode: "insensitive" };
    filters.push({
      OR: [
        { name: fText },
        { id: fText },
        {
          Product: {
            OR: [{ name: fText }, { productDescription: fText }],
          },
        },
      ],
    });
  }
  const where =
    filters.length === 0
      ? {}
      : filters.length === 1
      ? filters[0]
      : { AND: filters };
  const total = await prisma.productVariant.count({ where });
  const data = await prisma.productVariant.findMany({
    where,
    skip: (Number(filter.page) - 1) * Number(filter.size),
    take: Number(filter.size),
    orderBy: { createdAt: "desc" },
    include: {
      Product: true,
    },
  });

  return {
    data,
    total,
    pages: Math.ceil(total / Number(filter.size)),
  };
};

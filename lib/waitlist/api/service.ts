import { prisma } from "@api/prisma";
import { QueryParamType } from "@ui/hooks/query-param";
import { AppError } from "@util/errors";

export const createWaitList = async (phoneNumber: string, name: string) => {
  return prisma.waitListPhoneNumber.create({
    data: {
      phoneNumber,
      name,
    },
  });
};

export const getWaitList = async (filter: QueryParamType) => {
  const size = Number(filter.size),
    page = Number(filter.page);

  if (size <= 0 || page <= 0)
    throw AppError.BadRequest("validation.paging.size");

  const filters: any | any[] = [];
  if (filter.text) {
    const fText = { contains: filter.text, mode: "insensitive" };
    filters.push({
      OR: [{ phoneNumber: fText }, { name: fText }],
    });
  }

  const where =
    filters.length === 0
      ? {}
      : filters.length === 1
      ? filters[0]
      : { AND: filters };
  const total = await prisma.waitListPhoneNumber.count({ where });

  return {
    total,
    pages: Math.ceil(total / size),
    data: await prisma.waitListPhoneNumber.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: size * (page - 1),
      take: size,
    }),
  };
};

export const getWaitListById = async (id: string) => {
  return prisma.waitListPhoneNumber.findUnique({
    where: { id },
  });
};

export const deleteWaitList = async (id: string) => {
  return prisma.waitListPhoneNumber.delete({
    where: { id },
  });
};

export const updateWaitList = async (
  id: string,
  phoneNumber: string,
  name: string
) => {
  return prisma.waitListPhoneNumber.update({
    where: { id },
    data: {
      phoneNumber,
      name,
    },
  });
};

import { getCurrentDate } from "@api/currentDate";
import { prisma } from "@api/prisma";
import { UserRole } from "@prisma/client";
import { QueryParamType } from "@ui/hooks/query-param";
import { convertCyrillic2Latin } from "@util/converters";
import { AppError } from "@util/errors";
import { compare, hash } from "bcryptjs";

const saltRounds = 10;

const defaultSelect = {
  id: true,
  email: true,
  emailVerified: true,
  phoneNumber: true,
  phoneNumberVerified: true,
  role: true,
  updatedAt: true,
  createdAt: true,
  inviteToken: true,
  isTokenUsed: true,
  invitedBy: true,
  hospital: {
    select: {
      id: true,
      name: true,
      hospitalLogo: true,
      subDomain: true,
    },
  },
  profile: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      latinName: true,
      sex: true,
      dob: true,
      height: true,
      weight: true,
      picture: true,
    },
  },
};
export const updateProfileLatinName = async () => {
  const profiles = await prisma.profile.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
  profiles.forEach(async (item) => {
    await prisma.profile.update({
      where: { id: item.id },
      data: {
        latinName:
          convertCyrillic2Latin(item.firstName) +
          " " +
          convertCyrillic2Latin(item.lastName),
      },
    });
  });
};
export const getUserList = async (filter: QueryParamType) => {
  const size = Number(filter.size),
    page = Number(filter.page);

  if (size <= 0 || page <= 0)
    throw AppError.BadRequest("validation.paging.size");

  const filters: any | any[] = [];
  if (filter.role) filters.push({ role: filter.role });
  if (filter.text) {
    const fText = { contains: filter.text, mode: "insensitive" };
    filters.push({
      OR: [
        { phoneNumber: fText },
        { email: fText },
        {
          profile: {
            OR: [
              { firstName: fText },
              { lastName: fText },
              { latinName: fText },
            ],
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
  const total = await prisma.user.count({ where });

  return {
    total,
    pages: Math.ceil(total / size),
    data: await prisma.user.findMany({
      where,
      include: {
        profile: {
          select: {
            firstName: true,
            lastName: true,
            latinName: true,
            priceMin: true,
            priceMax: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: size * (page - 1),
      take: size,
    }),
  };
};

export const getUser = async (email: string) => {
  return prisma.user.findUnique({
    where: { email: email },
    select: defaultSelect,
  });
};

export const manageExternalUser = async (
  email: string,
  provider: string,
  providerAccountId: string,
  accessToken: string,
  refreshToken: string
) => {
  const account = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider,
        providerAccountId,
      },
    },
    include: {
      user: true,
    },
  });
  if (account) {
    return account.user;
  } else {
    // const user = await prisma.user.create({
    //   data: {
    //     email: email ? email.toLowerCase() : "",
    //     phoneNumber: "00000000",
    //   },
    //   select: defaultSelect,
    // });

    // await prisma.account.create({
    //   data: {
    //     userId: user.id,
    //     type: "external",
    //     provider,
    //     providerAccountId,
    //     accessToken,
    //     refreshToken,
    //   },
    // });
    return null;
  }
};

export const getUserPasswordDigest = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
    select: { ...defaultSelect, passwordDigest: true },
  });
  const passwordDigest = user?.passwordDigest;
  // @ts-expect-error
  if (user) delete user.passwordDigest;
  return { user, passwordDigest };
};

export const getUserPasswordDigestByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { ...defaultSelect, passwordDigest: true },
  });
  const passwordDigest = user?.passwordDigest;
  // @ts-expect-error
  if (user) delete user.passwordDigest;
  return { user, passwordDigest };
};

export const getUserPasswordDigestByPhone = async (phoneNumber: string) => {
  const user = await prisma.user.findUnique({
    where: { phoneNumber },
    select: { ...defaultSelect, passwordDigest: true },
  });
  const passwordDigest = user?.passwordDigest;
  // @ts-expect-error
  if (user) delete user.passwordDigest;
  return { user, passwordDigest };
};

export const getUserPasswordDigestById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user?.passwordDigest;
};
export const changeUserInvitationToken = async (
  id: string,
  inviteToken: string
) => {
  await prisma.user.update({
    where: { id },
    data: {
      inviteToken,
      isTokenUsed: null,
    },
  });
};
export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: defaultSelect,
  });
};
export const getVerifiedUserByPhoneNumber = async (phoneNumber: string) => {
  return prisma.user.findFirst({
    where: { phoneNumber, phoneNumberVerified: { not: null } },
    select: {
      id: true,
      phoneNumber: true,
      pin: true,
      isTokenUsed: true,
      profile: true,
      email: true,
      role: true,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
    select: defaultSelect,
  });
};
export const getUserByUnusedToken = async (inviteToken: string) => {
  return prisma.user.findUnique({
    where: { inviteToken },
    select: {
      id: true,
      isTokenUsed: true,
      profile: true,
      email: true,
      role: true,
    },
  });
};

export const deleteInvitedUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (user?.isTokenUsed == null) {
    await prisma.user.deleteMany({
      where: { id: userId, isTokenUsed: null },
    });
    return { result: "already-registered-cant-delete" };
  } else return { result: "success" };
};

export const compareUserPassword = async (userId: string, password: string) => {
  const userPassword = (await getUserPasswordDigestById(userId)) || "";
  return compare(password, userPassword);
};

export const resetPassword = async (phoneNumber: string, password: string) => {
  const user = await getUserPasswordDigestByPhone(phoneNumber);
  return await changePassword({ userId: user.user!.id, password: password });
};

export const changePasswordByToken = async ({
  inviteToken,
  password,
}: {
  inviteToken: string;
  password: string;
}) => {
  const user = await getUserByUnusedToken(inviteToken);
  await changePassword({ userId: user!.id, password: password });
  await setTokenAsUsed(inviteToken);
  return user;
};

const setTokenAsUsed = async (inviteToken: string) => {
  await prisma.user.update({
    where: { inviteToken },
    data: { isTokenUsed: new Date() },
  });
};

export const checkEmailNotExists = async (email: string) => {
  return (await prisma.user.count({ where: { email } })) === 0;
};

export const checkPhoneNotExists = async (phoneNumber: string) => {
  return (await prisma.user.count({ where: { phoneNumber } })) === 0;
};

export const checkPhoneNumberFailedRequest = async (
  phoneNumber: string,
  ipAddress: string,
  limit?: number
) => {
  if (!limit) limit = 5;
  const limitDate = new Date();
  limitDate.setHours(limitDate.getHours() - 0.5);
  const result = await prisma.smsRequestAttempt.count({
    where: { OR: [{ phoneNumber, ipAddress }], createdAt: { gte: limitDate } },
  });
  if (result < limit) {
    await createPhoneNumberRequestAttempt(phoneNumber, ipAddress);
    return true;
  }
  return false;
};

export const createPhoneNumberRequestAttempt = async (
  phoneNumber: string,
  ipAddress: string
) => {
  return prisma.smsRequestAttempt.create({
    data: {
      phoneNumber,
      ipAddress,
    },
  });
};
export const changePhoneNumber = async ({
  userId,
  phoneNumber,
}: {
  userId: string;
  phoneNumber: string;
}) => {
  await prisma.user.update({
    where: { id: userId },
    data: { phoneNumber },
  });
  return {};
};

export const changeEmail = async ({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) => {
  await prisma.user.update({
    where: { id: userId },
    data: { email },
  });
  return {};
};

export const changePasswordByUsername = async (
  method: string,
  username: string,
  password: string
) => {
  const user = await prisma.user.findUnique({
    where: method === "phone" ? { phoneNumber: username } : { email: username },
  });
  if (!user) return;
  await changePassword({ userId: user.id, password });
  return user;
};

export const changePassword = async ({
  userId,
  password,
}: {
  userId: string;
  password: string;
}) => {
  const passwordDigest = await hash(password, saltRounds);
  await prisma.user.update({
    where: { id: userId },
    data: { passwordDigest },
  });
  return {};
};

//   userId,
//   lastRecommendedSpecialty,
// }: {
//   userId: string;
//   lastRecommendedSpecialty: string;
// }) => {
//   await prisma.user.update({
//     where: { id: userId },
//     // data: { lastRecommendedSpecialty },
//   });
//   return {};
// };
export const createMessage = async ({
  hospitalId,
  phoneNumber,
  message,
}: {
  hospitalId: string;
  phoneNumber: string;
  message: string;
}) => {
  // return prisma.message.create({
  //   data: {
  //     phoneNumber,
  //     hospitalId,
  //     message,
  //   },
  // });
};
export const createUserWithPhoneNumber = async (
  phoneNumber: string,
  pin: string
) => {
  const newUser = await prisma.user.create({
    data: {
      phoneNumber,
      pin,
      pinCreatedAt: getCurrentDate(),
      role: "HOSPITAL_OWNER",
    },
    select: { id: true },
  });

  return (await prisma.user.findUnique({
    where: {
      id: newUser.id,
    },
    select: defaultSelect,
  }))!;
};
export const getNotVerifiedUserByPhoneNumber = async (
  phoneNumber: string,
  verifyToken: string
) => {
  const user = await prisma.user.findFirst({
    where: { phoneNumber, phoneNumberVerified: null },
  });
  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: { pin: verifyToken, pinCreatedAt: getCurrentDate() },
    });
  }
  return user;
};
export const createUserWithPhoneNumberValidate = async (
  userId: string,
  pin: string
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) throw new AppError(404, "User not found");
  if (user.pin !== pin) throw new AppError(401, "Incorrect PIN");
  await prisma.user.update({
    where: { id: userId },
    data: {
      phoneNumberVerified: getCurrentDate(),
      pinCreatedAt: null,
      pin: null,
    },
  });
  return (await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: defaultSelect,
  }))!;
};
export const createUserWithPassword = async (
  userId: string,
  password: string
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) throw new AppError(404, "User not found");
  const passwordDigest = await hash(password, saltRounds);
  await prisma.user.update({
    where: { id: userId },
    data: { passwordDigest },
  });
  return (await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: defaultSelect,
  }))!;
};
export const verifyUserByPhoneNumber = async (
  phoneNumber: string,
  pin: string
) => {
  const user = await prisma.user.findFirst({
    where: { phoneNumber, pin },
  });
  //clear pin
  if (user)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        pin: null,
        pinCreatedAt: null,
        phoneNumberVerified: getCurrentDate(),
      },
    });
  return user;
};

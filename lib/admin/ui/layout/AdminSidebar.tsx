import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactNode } from "react";
import { BiCreditCard } from "react-icons/bi";
import {
  FaHome,
  FaHospital,
  FaList,
  FaUserCog,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { HiPuzzle } from "react-icons/hi";
import { MdCreditCard, MdPriceChange } from "react-icons/md";

type MenuItemType = {
  label: string;
  icon?: ReactNode;
  href?: string;
};

const menuItems: (MenuItemType & { items?: MenuItemType[] })[] = [
  { label: "Нүүр", icon: <FaHome />, href: "/admin" },
  {
    label: "Хэрэглэгч",
    items: [
      {
        label: "Бүх хэрэглэгч",
        icon: <FaUsers />,
        href: "/admin/users",
      },
      {
        label: "Админ",
        icon: <FaUserCog />,
        href: "/admin/users?role=ADMIN",
      },
      {
        label: "Ажилтан",
        icon: <FaUserShield />,
        href: "/admin/users?role=TECHNICAL_SUPPORT",
      },
      {
        label: "Харилцагч",
        icon: <FaUserShield />,
        href: "/admin/users?role=USER",
      },
      {
        label: "Waitlist",
        icon: <FaList />,
        href: "/admin/waitlist",
      },
    ],
  },
  {
    label: "Эмнэлэг",
    items: [
      {
        label: "Эмнэлэг",
        icon: <FaHospital />,
        href: "/admin/hospital",
      },
    ],
  },
  {
    label: "Бүтээгдэхүүн",
    items: [
      {
        label: "Үнийн хүснэгт",
        icon: <MdPriceChange />,
        href: "/admin/priceTable",
      },
      {
        label: "Орлого",
        icon: <MdCreditCard />,
        href: "/admin/revenue",
      },
    ],
  },
  {
    label: "Бусад холболт",
    items: [{ label: "Мессэж", icon: <HiPuzzle />, href: "/admin/widgets" }],
  },
  {
    label: "Суурь өгөгдөл",
    items: [{ label: "Тест", icon: <BiCreditCard /> }],
  },
];

export const AdminSidebar = () => {
  return (
    <Flex
      h="full"
      minW={48}
      w={48}
      direction="column"
      borderRight="1px"
      borderColor="gray.200"
    >
      <Stack spacing="4" flex="1" overflow="auto" py="3" pr="2">
        {menuItems.map((item, i) =>
          item.items ? (
            <NavGroup key={`menuitem-${i}`} label={item.label}>
              {item.items.map((subitem, si) => (
                <AdminNavLinkItem
                  key={`menuitem-${i}-${si}`}
                  href={subitem.href}
                  icon={subitem.icon}
                  label={subitem.label}
                />
              ))}
            </NavGroup>
          ) : (
            <AdminNavLinkItem
              key={`menuitem-${i}`}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          )
        )}
      </Stack>
    </Flex>
  );
};

const NavGroup = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <Box>
    <Text
      px="2.5"
      fontSize="xs"
      fontWeight="semibold"
      textTransform="uppercase"
      letterSpacing="widest"
      color="gray.800"
      mb="1"
    >
      {label}
    </Text>
    <Stack spacing="1">{children}</Stack>
  </Box>
);

const AdminNavLinkItem = ({
  label,
  icon,
  href,
}: {
  label: string;
  icon: ReactNode;
  href?: string;
}) =>
  href ? (
    <NextLink href={href}>
      <HStack
        px="2"
        py="1"
        rounded="md"
        transition="all 0.2s"
        _hover={{ bg: "gray.200", color: "gray.400" }}
      >
        <Text fontSize="lg">{icon}</Text>
        <Text>{label}</Text>
      </HStack>
    </NextLink>
  ) : (
    <HStack px="2" py="1" color="gray.400">
      <Text fontSize="lg">{icon}</Text>
      <Text>{label}</Text>
    </HStack>
  );

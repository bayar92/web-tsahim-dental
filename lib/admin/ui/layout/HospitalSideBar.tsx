import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactNode } from "react";
import { FaHome, FaHospital, FaPencilAlt } from "react-icons/fa";
import {
  MdAccessTimeFilled,
  MdAttachMoney,
  MdComputer,
  MdNoteAdd,
} from "react-icons/md";

export const HospitalSidebar = () => {
  return (
    <Flex
      h="full"
      minW={56}
      w={56}
      direction="column"
      borderRight="1px"
      borderColor="gray.200"
    >
      <Stack spacing="4" flex="1" overflow="auto" py="2" pr="2">
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
type MenuItemType = {
  label: string;
  icon?: ReactNode;
  href?: string;
};

const menuItems: (MenuItemType & { items?: MenuItemType[] })[] = [
  { label: "Нүүр", icon: <FaHome />, href: "/" },
  {
    label: "Эмнэлэг",
    items: [
      { label: "Эмнэлгийн мэдээлэл", icon: <FaHospital />, href: "/hospital" },
      {
        label: "Худалдан авалт",
        icon: <MdAttachMoney />,
        href: "/hospital/subscription",
      },
      {
        label: "Суулгасан компьютер",
        icon: <MdComputer />,
        href: "/hospital/computers",
      },
      {
        label: "Цаг захиалга",
        icon: <MdAccessTimeFilled />,
        href: "/hospital/time",
      },
      {
        label: "Ерөнхий биеийн асуумж",
        icon: <FaHospital />,
        href: "/hospital/gbq",
      },
      {
        label: "Таниулах зөвшөөрөл",
        icon: <FaPencilAlt />,
        href: "/hospital/identify",
      },
    ],
  },
];

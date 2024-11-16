import { UserRole } from "@prisma/client";
import { Avatar, AvatarBadge, CountryFlag, useColorModeValue } from "@ui/index";
import {
  FaCogs,
  FaGraduationCap,
  FaHospital,
  FaHospitalAlt,
  FaShieldAlt,
  FaStethoscope,
  FaUserInjured,
} from "react-icons/fa";

export const UserAvatar = ({ role }: { role?: UserRole | string }) => {
  return (
    <Avatar
      borderWidth="1"
      borderRadius="50%"
      size="sm"
      color={useColorModeValue("white", "gray.200")}
      sx={{ "& > div": { fontSize: "0.625rem" } }}
      bg={useColorModeValue("gray.300", "gray.700")}
      fontSize="2xl"
      icon={
        role === UserRole.ADMIN ? (
          <FaCogs />
        ) : role === UserRole.USER ? (
          <FaShieldAlt />
        ) : (
          <></>
        )
      }
    >
      <AvatarBadge boxSize="6" fontSize="0 !important"></AvatarBadge>
    </Avatar>
  );
};

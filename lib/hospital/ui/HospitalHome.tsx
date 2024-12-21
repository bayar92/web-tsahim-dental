import { Button, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { Hospital } from "@prisma/client";
import { useState } from "react";
import { FaHospital } from "react-icons/fa";
import { GiOfficeChair } from "react-icons/gi";
import { HiOutlinePhone, HiUser } from "react-icons/hi";
import { MdAppRegistration, MdPhone } from "react-icons/md";
import { useGetMyHospital } from "../data/hooks";
import {
  HospitalRegistrationForm,
  HospitalRegistrationFormType,
} from "./HospitalRegistrationForm";

export const HospitalHome = () => {
  const { data, isLoading, refetch } = useGetMyHospital();

  return (
    <VStack>
      {isLoading ? (
        <></>
      ) : data && data.register ? (
        <HospitalInfo data={data} />
      ) : (
        <HospitalRegistrationForm refetch={refetch} />
      )}
    </VStack>
  );
};

export const HospitalInfo = ({
  data,
  refetch,
}: {
  data: HospitalRegistrationFormType;
  refetch?: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <VStack w="full" spacing={4} alignItems="flex-start">
        <HospitalRegistrationForm
          data={data}
          onClose={() => setIsEditing(false)}
          refetch={refetch}
        />
        <Button onClick={() => setIsEditing(false)}>Цуцлах</Button>
      </VStack>
    );
  }

  return (
    <VStack w="full" spacing={2} alignItems="flex-start">
      <HStack w="full" justify="space-between">
        <Heading size="lg">Эмнэлгийн мэдээлэл</Heading>
        <Button onClick={() => setIsEditing(true)}>Засах</Button>
      </HStack>

      <VStack alignItems="flex-start">
        <Heading size="sm">Эмнэлгийн нэр</Heading>
        <HStack>
          <Icon color="gray.300" as={FaHospital} />
          <Text>{data.name}</Text>
        </HStack>
      </VStack>

      <VStack alignItems="flex-start">
        <Heading size="sm">Утасны дугаар</Heading>
        <HStack>
          <Icon color="gray.300" as={HiOutlinePhone} />
          <Text>{data.phoneNumber}</Text>
        </HStack>
      </VStack>

      <VStack alignItems="flex-start">
        <Heading size="md">Регистрийн дугаар</Heading>
        <HStack>
          <Icon color="gray.300" as={MdAppRegistration} />
          <Text>{data.register}</Text>
        </HStack>
      </VStack>

      <VStack alignItems="flex-start">
        <Heading size="md">Креслийн тоо</Heading>
        <HStack>
          <Icon color="gray.300" as={GiOfficeChair} />
          <Text>{data.totalSit}</Text>
        </HStack>
      </VStack>

      {data.directorInfo && (
        <VStack alignItems="flex-start">
          <Heading size="md">Эмнэлгийн захирал</Heading>
          <HStack>
            <Icon color="gray.300" as={HiUser} />
            <Text>{data.directorInfo}</Text>
          </HStack>
        </VStack>
      )}
    </VStack>
  );
};

import { Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { Hospital } from "@prisma/client";
import { useState } from "react";
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
      ) : data ? (
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
        <Heading size="md">Эмнэлэгийн нэр</Heading>
        <Text>{data.name}</Text>
      </VStack>

      <VStack alignItems="flex-start">
        <Heading size="md">Утасны дугаар</Heading>
        <Text>{data.phoneNumber}</Text>
      </VStack>

      <VStack alignItems="flex-start">
        <Heading size="md">Регистрийн дугаар</Heading>
        <Text>{data.register}</Text>
      </VStack>

      <VStack alignItems="flex-start">
        <Heading size="md">Креслийн тоо</Heading>
        <Text>{data.totalSit}</Text>
      </VStack>

      {data.directorInfo && (
        <VStack alignItems="flex-start">
          <Heading size="md">Эмнэлгийн директор</Heading>
          <Text>{data.directorInfo}</Text>
        </VStack>
      )}
    </VStack>
  );
};

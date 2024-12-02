import { VStack } from "@chakra-ui/react";
import { useGetMyHospital } from "../data/hooks";

export const HospitalComputers = () => {
  const { data, isLoading, refetch } = useGetMyHospital();

  return <VStack></VStack>;
};

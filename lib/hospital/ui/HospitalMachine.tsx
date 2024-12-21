import {
  Box,
  Card,
  HStack,
  Icon,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  FaCalendar,
  FaCalendarAlt,
  FaCalendarCheck,
  FaCalendarPlus,
  FaClock,
  FaDesktop,
  FaIdCard,
  FaMapMarkerAlt,
  FaWindows,
} from "react-icons/fa";
import { MdComputer } from "react-icons/md";
import { useGetHospitalMachines } from "../data/hooks";

export const HospitalMachine = () => {
  const { data: machines, isLoading } = useGetHospitalMachines();

  // Group machines by hospitalId
  const groupedMachines = machines?.reduce((acc: any, machine: any) => {
    if (!acc[machine.hospitalId]) {
      acc[machine.hospitalId] = [];
    }
    acc[machine.hospitalId].push(machine);
    return acc;
  }, {});

  return (
    <Stack spacing={6}>
      <HStack>
        <Icon color="gray.400" as={MdComputer} fontSize="24px" />
        <Text fontSize={24} mb={8}>
          Суулгасан компьютерүүд
        </Text>
      </HStack>
      {groupedMachines &&
        Object.entries(groupedMachines).map(
          ([hospitalId, hospitalMachines]: [string, unknown]) => {
            if (!Array.isArray(hospitalMachines)) return null;
            const hospitalName = hospitalMachines[0]?.hospital?.name;

            return (
              <Box key={hospitalId}>
                <Text fontSize="lg" fontWeight="bold" mb={4}>
                  Эмнэлэг: {hospitalName}
                </Text>
                <TableContainer>
                  <Table variant="simple" size="sm">
                    <Thead>
                      <Tr>
                        <Th>Компьютер</Th>
                        <Th>Хаяг</Th>
                        <Th>Огноо</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {hospitalMachines.map((machine: any) => (
                        <Tr key={machine.id}>
                          <Td>
                            <Icon as={FaDesktop} /> {machine.machineName}
                          </Td>
                          <Td>
                            <Text fontSize="xs">
                              <Icon as={FaMapMarkerAlt} /> {machine.ipAddress}
                            </Text>
                            <Text fontSize="xs">
                              <Icon as={FaWindows} /> {machine.os?.name}{" "}
                              {machine.os?.version}
                            </Text>
                            <Text fontSize="xs">
                              <Icon as={FaIdCard} /> {machine.machineUniqueId}
                            </Text>
                          </Td>
                          <Td>
                            <Text>
                              <Icon as={FaCalendarPlus} />
                              {new Date(
                                machine.registeredAt
                              ).toLocaleDateString()}
                            </Text>
                            <Text>
                              <Icon as={FaCalendarCheck} />
                              {machine.subscriptionEndDate
                                ? new Date(
                                    machine.subscriptionEndDate
                                  ).toLocaleDateString()
                                : "Бүртгэгдээгүй"}
                            </Text>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            );
          }
        )}
    </Stack>
  );
};

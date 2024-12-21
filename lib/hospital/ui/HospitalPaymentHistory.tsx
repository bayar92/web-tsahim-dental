import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useGetHospitalPaymentHistory } from "@lib/hospital/data/hooks";

export const HospitalPaymentHistory = () => {
  const { data, isLoading } = useGetHospitalPaymentHistory();

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Бүтээгдэхүүн</Th>
            <Th>Үргэлжлэх хугацаа</Th>
            <Th>Дүн</Th>
            <Th>Огноо</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((payment: any) => (
            <Tr key={payment.id}>
              <Td>{payment.ProductVariant.name}</Td>
              <Td>{payment.ProductVariant.duration} сар</Td>
              <Td>{payment.amount}₮</Td>
              <Td>{new Date(payment.createdAt).toLocaleDateString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {!data?.length && (
        <Text p={4} textAlign="center">
          Төлбөр төлсөн түүх олдсонгүй
        </Text>
      )}
    </Box>
  );
};

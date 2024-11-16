import { Box, Card, CardBody, HStack, Text } from "@chakra-ui/react";
import { FaCalendarDay } from "react-icons/fa";
import { format } from "date-fns";

export const HospitalTime = () => {
  const date = new Date();

  return (
    <Card width="300px" boxShadow="md">
      <CardBody>
        <HStack>
          <FaCalendarDay />
          <Text>{format(date, "yyyy.MM.dd")}</Text>
        </HStack>
        <Box mt={4}>
          <Text fontWeight="bold" fontSize="lg">
            {format(date, "MM")} сарын {format(date, "dd")}-ны{" "}
            {format(date, "HH")}:{format(date, "mm")} цагт та цаг захиалсан
            байна.
          </Text>
          <Text>Та Эвада эмнэлэг дээр ирнэ үү!</Text>
        </Box>
      </CardBody>
    </Card>
  );
};

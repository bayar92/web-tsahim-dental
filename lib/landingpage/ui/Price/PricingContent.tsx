import { Flex, VStack, HStack, Icon, Box, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaCheckCircle } from "react-icons/fa";

export const PricingContent = ({
  list,
  title,
  icon,
  bottomComponent,
  isEnterprise = false,
}: {
  list: any[];
  title: string;
  icon: ReactNode;
  bottomComponent?: ReactNode;
  isEnterprise?: boolean;
}) => {
  return (
    <Flex
      w="full"
      direction={"column"}
      border={"1px solid"}
      borderColor={isEnterprise ? "primary.100" : "gray.100"}
      bg={isEnterprise ? "primary.50" : "gray.50"}
      p="4"
      borderRadius={8}
      textAlign="left"
      justifyContent={"space-between"}
    >
      <Box className="stayOnTop" w="full">
        <VStack w="full" gap={"1px"}>
          <Text
            fontSize={"lg"}
            py="2"
            color={isEnterprise ? "primary.700" : "gray.700"}
          >
            {icon} {title}
          </Text>

          {list.map((item, index) => (
            <HStack w="full" key={index}>
              <Icon
                as={FaCheckCircle}
                color={isEnterprise ? "primary.500" : "gray.600"}
                boxSize="16px"
              />
              <Text
                as="span"
                color="gray.700"
                fontSize="14px"
                lineHeight="20px"
                fontWeight={400}
              >
                {item}
              </Text>
            </HStack>
          ))}
        </VStack>
      </Box>
      <Box className="pushToBottom" w="full" color="gray.700">
        {bottomComponent}
      </Box>
    </Flex>
  );
};

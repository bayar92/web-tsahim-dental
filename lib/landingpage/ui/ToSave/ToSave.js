"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Icon,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdAccessTime, MdStorage, MdSecurity } from "react-icons/md";

export const ToSave = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.700");

  return (
    <Box maxW="7xl" mx="auto" px={6} py={16}>
      {/* Title */}
      <VStack textAlign="center" mb={12}>
        <Heading
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight="bold"
          color="gray.800"
        >
          E Dental програмыг ашигласнаар та юу хэмнэх вэ?
        </Heading>
      </VStack>

      {/* Grid */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {/* Цаг хэмнэлт */}
        <Box
          p={8}
          rounded="xl"
          bg={cardBg}
          border="1px solid"
          borderColor={border}
          shadow="sm"
          _hover={{ shadow: "md", borderColor: "blue.400", transform: "translateY(-4px)", transition: "0.3s" }}
        >
          <VStack spacing={4} align="stretch">
            <Icon as={MdAccessTime} boxSize={10} color="blue.500" />
            <Heading fontSize="lg" fontWeight="bold">
              Цаг хэмнэлт
            </Heading>
            <Divider />
            <Text>• Карт хайх цаг</Text>
            <Text>• Цаг сануулах (утсаар ярих, мессеж бичих)</Text>
            <Text>• Тооцоо тулгах, касс хаах</Text>
            <Text>• Тайлан гаргах</Text>
            <Text fontWeight="semibold" color="blue.600">
              → Нэг хүний сарын ажлын цагийг бүрэн хэмнэнэ
            </Text>
          </VStack>
        </Box>

        {/* Орон зай ба бичгийн цаас */}
        <Box
          p={8}
          rounded="xl"
          bg={cardBg}
          border="1px solid"
          borderColor={border}
          shadow="sm"
          _hover={{ shadow: "md", borderColor: "blue.400", transform: "translateY(-4px)", transition: "0.3s" }}
        >
          <VStack spacing={4} align="stretch">
            <Icon as={MdStorage} boxSize={10} color="green.500" />
            <Heading fontSize="lg" fontWeight="bold">
              Орон зай & Бичгийн цаас
            </Heading>
            <Divider />
            <Text>• Үзлэгийн картууд 1~2м² талбай эзэлдэг</Text>
            <Text>• Хадгалах шаардлагагүй</Text>
            <Text>• Сард 300 ширхэг бичгийн цаас хэмнэнэ</Text>
            <Text>• Карт, зөвшөөрөл, асуумж хэвлэх шаардлагагүй</Text>
          </VStack>
        </Box>

        {/* Өгөгдлийн аюулгүй байдал */}
        <Box
          p={8}
          rounded="xl"
          bg={cardBg}
          border="1px solid"
          borderColor={border}
          shadow="sm"
          _hover={{ shadow: "md", borderColor: "blue.400", transform: "translateY(-4px)", transition: "0.3s" }}
        >
          <VStack spacing={4} align="stretch">
            <Icon as={MdSecurity} boxSize={10} color="purple.500" />
            <Heading fontSize="lg" fontWeight="bold">
              Өгөгдлийн аюулгүй байдал
            </Heading>
            <Divider />
            <Text>• Cloud.mn үндэсний дата төвд хадгалагдана</Text>
            <Text>• TIER2, ISO9001, ISO27001, NIST-800-53 стандарт</Text>
            <Text>• 99.98%-ийн найдвартай ажиллагаа</Text>
            <Text>• УБ хотын дата төвд тасралтгүй хадгалалт</Text>
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

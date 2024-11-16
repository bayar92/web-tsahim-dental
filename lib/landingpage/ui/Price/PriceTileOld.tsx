import {
  Box,
  Button,
  Checkbox,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from "@ui/index";
import { currencyDisplayHandler } from "@util/converters";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { PriceModel } from "./Pricing";

export const PriceTileOld = ({
  priceModel,
  selectedPriceVariant,
}: {
  priceModel: PriceModel;
  selectedPriceVariant: number;
}) => {
  const [selectEnv, setSelectedEnv] = useState("local"); //local, cloud
  const [isBackup, setIsBackup] = useState(false); //local, cloud
  useEffect(() => {}, [selectEnv]);
  const offlineSercives: string[] = [
    "Үйлчлүүлэгчийн бүртгэл",
    "Цаг захиалга",
    "Анхан үзлэг, зовиурын бүртгэл",
    "Төлөвлөгөө, эмчилгээний бүртгэл",
    "Дараа хийх эмчилгээний бүртгэл",
    "Рентген зургийн машинд холбогдох",
    "Статистик мэдээлэл",
    "Кассын бүртгэл",
    "Өдөр болгоны өөрлөлтийг хадгалах",
  ];
  const cloudSercives: string[] = [
    "Үйлчлүүлэгчийн бүртгэл",
    "Цаг захиалга",
    "Анхан үзлэг, зовиурын бүртгэл",
    "Төлөвлөгөө, эмчилгээний бүртгэл",
    "Дараа хийх эмчилгээний бүртгэл",
    "Рентген зургийн машинд холбогдох",
    "Статистик мэдээлэл",
    "Кассын бүртгэл",
    "НӨАТ-н баримт хэвлэх",
    "Интернэр орчинд ажиллах",
    "Эргэн сануулах үйлчилгээ",
    "Олон салбар дундаа мэдээлэл солилцох",
    "Эмч цаг захиалгыг хүссэн газраасаа харах",
    "Үйлчлүүлэгч өөрийн цаг захиалгаа харах",
    "Өдөр болгоны өөрлөлтийг хадгалах",
  ];
  return (
    <VStack mx="auto" textAlign="center" bg="white" mt={-14}>
      <VStack
        w="full"
        border="1px solid"
        borderColor={"gray.200"}
        borderRadius={16}
        gap={2}
        p={6}
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          w="full"
          flex="1"
          alignContent={"flex-start"}
        >
          <VStack w="full">
            <Box borderRadius={"999px"} p={2} px={4} bg="gray.100">
              <Text
                color="gray.800"
                fontSize={"14px"}
                lineHeight="20px"
                fontWeight={500}
              >
                {priceModel.title}
              </Text>
            </Box>
            <Text
              color="gray.900"
              fontSize={"48px"}
              lineHeight="60px"
              minW={"270px"}
              fontWeight={"700"}
            >
              {currencyDisplayHandler(
                ((selectEnv == "local"
                  ? priceModel.price
                  : priceModel.cloudPrice) +
                  (isBackup ? priceModel.backupPrice : 0)) *
                  selectedPriceVariant,
                "mn"
              )}
            </Text>
            <Text
              color={selectedPriceVariant == 1 ? "transparent" : "gray.600"}
            >
              {selectedPriceVariant == 5
                ? "  -" +
                  currencyDisplayHandler(
                    (selectEnv == "local"
                      ? priceModel.price
                      : priceModel.cloudPrice) +
                      (isBackup ? priceModel.backupPrice : 0),
                    "mn"
                  ) +
                  " хэмнэлт"
                : ""}
            </Text>
          </VStack>
          <PricingContent list={priceModel.features} />
        </Stack>
        {selectEnv == "online" ? (
          <Checkbox isChecked={true} colorScheme="green">
            {" "}
            <Text>Өдөр болгон Backup авна</Text>
          </Checkbox>
        ) : (
          <Checkbox
            isChecked={isBackup}
            colorScheme="green"
            onChange={(e) => {
              setIsBackup(e.target.checked);
            }}
          >
            {" "}
            <Text>Өдөр болгон Backup авна</Text>
          </Checkbox>
        )}

        <HStack
          w="full"
          mt={4}
          bg="gray.100"
          h="48px"
          p={1}
          borderRadius={"24px"}
        >
          <Button
            w="full"
            onClick={() => {
              setIsBackup(false);
              setSelectedEnv("local");
            }}
            variant={
              selectEnv == "local" ? "secondary_rounded" : "ghost_rounded"
            }
          >
            Дотоод сүлжээнд
          </Button>
          <Button
            onClick={() => {
              setSelectedEnv("online");
              setIsBackup(true);
            }}
            w="full"
            variant={
              selectEnv == "online" ? "secondary_rounded" : "ghost_rounded"
            }
          >
            Интернэт орчинд
          </Button>
        </HStack>
      </VStack>
      {/* <Box w="full">
        <Stack
          direction={{ base: "column", md: "row" }}
          border="1px solid"
          borderColor={"primary.500"}
          borderRadius={16}
          gap={6}
          p={6}
        >
          <VStack textAlign={"start"} w="full">
            <Box borderRadius={"999px"} p={2} px={4} bg="primary.100">
              <Text
                color="primary.800"
                fontSize={"14px"}
                lineHeight="20px"
                fontWeight={500}
              >
                4-5 кресл
              </Text>
            </Box>
            <Text
              color="gray.900"
              fontSize={"48px"}
              lineHeight="60px"
              fontWeight={"700"}
            >
              390 000₮
              <Text
                as="span"
                fontSize={"16px"}
                lineHeight="24px"
                fontWeight={"400"}
              >
                /сард
              </Text>
            </Text>
            <Text fontSize={"14px"} lineHeight="20px">
              Нэг салбар дээр ашиглах багц
            </Text>
            <Button w="full">Худалдан авах</Button>
          </VStack>
          <PricingContent list={multiple} isEnterprise={true} />
        </Stack>
      </Box>
      <Box w="full">
        <Stack
          direction={{ base: "column", md: "row" }}
          border="1px solid"
          borderColor={"primary.500"}
          borderRadius={16}
          gap={6}
          p={6}
        >
          <VStack textAlign={"start"} w="full">
            <Box borderRadius={"999px"} p={2} px={4} bg="primary.100">
              <Text
                color="primary.800"
                fontSize={"14px"}
                lineHeight="20px"
                fontWeight={500}
              >
                6-с дээш кресл
              </Text>
            </Box>
            <Text
              color="gray.900"
              fontSize={"48px"}
              lineHeight="60px"
              fontWeight={"700"}
            >
              690 000₮
              <Text
                as="span"
                fontSize={"16px"}
                lineHeight="24px"
                fontWeight={"400"}
              >
                /сард
              </Text>
            </Text>
            <Text fontSize={"14px"} lineHeight="20px">
              Нэг салбар дээр ашиглах багц
            </Text>
            <Button w="full">Худалдан авах</Button>
          </VStack>
          <PricingContent list={premium} isEnterprise={true} />
        </Stack>
      </Box> */}
    </VStack>
  );
};
const PricingContent = ({
  list,
  isEnterprise = false,
}: {
  list: any[];
  isEnterprise?: boolean;
}) => {
  return (
    <VStack
      w="full"
      border={"1px solid"}
      borderColor={isEnterprise ? "primary.100" : "gray.100"}
      bg={isEnterprise ? "primary.50" : "gray.50"}
      p="4"
      borderRadius={8}
      textAlign="left"
    >
      <Text
        w="full"
        color="gray.700"
        fontSize="14px"
        lineHeight="20px"
        fontWeight={400}
      >
        Багтах үйлчилгээ
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
  );
};

import { useCreateInvoiceForUser } from "@lib/payment/data/qpayHook";
import { useGetProducts, useGetProductVariants } from "@lib/product/data/productHooks";
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  toaster,
  useDisclosure,
  VStack,
} from "@ui/index";
import { currencyDisplayHandler } from "@util/converters";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdCloudDone, MdHomeWork, MdShoppingCart } from "react-icons/md";
export type PriceModel = {
  key: number;
  title: string;
  price: number;
  discount: {};
  cloudPrice: number;
  backupPrice: number;
  totalPrice: number;
  features: string[];
};

export const Pricing = ({ user }: { user?: any }) => {
  const [packageVariant, setPackageVariant] = useState("0");
  const { data: productVariants } = useGetProductVariants();
  const { data: products } = useGetProducts();
  console.log('products:',products);  
  const [selectedProductId, setSelectedProductId] = useState<string>("none");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("none");
  const btnRef = React.useRef(null);

  const {
    isOpen: isQpayOpen,
    onOpen: onQPayBankChoiceOpen,
    onClose,
  } = useDisclosure();

  const invoiceMutation = useCreateInvoiceForUser();

  const [qpayUrl, setQpayUrl] = useState<any[]>([]);

  const createQPayInvoice = async () => {
    onQPayBankChoiceOpen();
    invoiceMutation.mutate(
      { paymentPlanId: selectedProductId },
      {
        onSuccess: (data) => {
          setQpayUrl(data.urls);
        },
        //Need to implement error handling when Qpay is down
      }
    );
  };
  const discount = {
    "1": "_",
    "5": "1 сар үнэгүй, 17% хэмнэлт",
    "10": "2 сар үнэгүй, 17% хэмнэлт",
  };
  const [selectEnv, setSelectedEnv] = useState("local"); //local, cloud
  const [isBackup, setIsBackup] = useState(false); //local, cloud
  useEffect(() => {}, [selectEnv]);

  const offlineSercives: string[] = [
    "Үйлчлүүлэгчийн бүртгэл",
    "Цаг захиалга",
    "Үзлэг, эмчилгээний тэмдэглэл",
    "Автомат мессеж явуулах тохиргоо",
    "Рентген аппаратанд холбогдох",
    "Статистик мэдээлэл",
    "Кассын мэдээлэл",
    "Эргэн сануулах үйлчилгээ",
    "Эмийн жор гаргах",
    "Үйлчлүүлэгчийг ухаалгаар менеж хийх",
    "НӨАТ-н баримт хэвлэх",
    "Лаборатори захиалгын мэдээлэл",
  ];

  const cloudSercives: string[] = [
    "Үйлчлүүлэгчийн бүртгэл",
    "Цаг захиалга",
    "Үзлэг, эмчилгээний тэмдэглэл",
    "Автомат мессеж явуулах тохиргоо",
    "Рентген аппаратанд холбогдох",
    "Статистик мэдээлэл",
    "Кассын мэдээлэл",
    "Эргэн сануулах үйлчилгээ",
    "Эмийн жор гаргах",
    "Үйлчлүүлэгчийг ухаалгаар менеж хийх",
    "НӨАТ-н баримт хэвлэх",
    "Лаборатори захиалгын мэдээлэл",
    "Өдөр болгоны өөрчлөлтийг хадгалах",
    "Олон салбар дундаа мэдээлэл солилцох",
    "Эмч цаг захиалгыг хүссэн газраасаа харах",
    "Таблет дээр үйлчлүүлэгчээс гарын үсэг авах",
  ];

  const [chairValue, setChairValue] = useState(4);
  const PriceList: PriceModel[] = [
    {
      key: 1,
      title: "1-3 кресл",
      price: 190000,
      cloudPrice: 290000,
      discount: discount,
      backupPrice: 20000,
      totalPrice: 290000,
      features: ["5 хүртэлх компьютер", "Програмын бүх боломжууд"],
    },
    {
      key: 2,
      title: "4-5 кресл",
      price: 240000,
      discount: discount,
      cloudPrice: 340000,
      backupPrice: 20000,
      totalPrice: 390000,
      features: ["8 хүртэлх компьютер", "Програмын бүх боломжууд"],
    },
    {
      key: 3,
      title: "6-10с дээш кресл",
      price: 290000,
      discount: discount,
      cloudPrice: 390000,
      backupPrice: 20000,
      totalPrice: 690000,
      features: ["12 хүртэлх компьютер", "Програмын бүх боломжууд"],
    },
  ];
  const router = useRouter();
  const openLoginScreen = () => {
    toaster.closeAll();
    //add query login
    router.push({ query: { login: true } });
  };

  const purchase = async (data: any) => {
    if (!user) {
      toaster.info(
        <Box color="white">
          <Text color="white">
            Худалдаж авахын тулд бүртгэлээрээ нэвтэрнэ үү.
          </Text>
          <Text
            as={"span"}
            color="white"
            onClick={openLoginScreen}
            borderBottom="1px dotted"
          >
            Нэвтрэх
          </Text>
        </Box>
      );
      return;
    }
    createQPayInvoice();
  };
  return (
    <>
      <VStack id="pricing" textAlign="center" mx="auto" gap={4}>
        <Box
          textAlign="center"
          borderRadius={"30px"}
          p={2}
          px={4}
          bg="gray.100"
          w="200px"
        >
          <Text
            color="gray.800"
            fontSize={"14px"}
            lineHeight="20px"
            fontWeight={500}
          >
            Үнэ
          </Text>
        </Box>
        <Heading fontSize={"36px"} lineHeight={"44px"} fontWeight="700">
          Танай үйл ажиллагаанд яг тохирсон үнэ
        </Heading>
        <Text color="gray.600" maxW={"600px"} fontWeight={400} fontSize={"md"}>
          Хамгийн сайн боломжуудыг агуулсан боломжийн үнийн төлөвлөгөөг сонгоно
          уу.
        </Text>
        <VStack mx="auto" textAlign="center" bg="white" mt={-14}>
          <VStack
            w="full"
            border="1px solid"
            borderColor={"gray.200"}
            borderRadius={16}
            gap={3}
            p={6}
          >
            <Stack
              direction={{ base: "column", md: "row" }}
              w="full"
              flex="1"
              alignContent={"flex-start"}
            >
              <PricingContent
                title="Дотоод сүлжээнд"
                list={offlineSercives}
                bottomComponent={
                  <Checkbox
                    sx={{
                      "& > span:first-of-type": {
                        borderRadius: "8px", // Change this value to your desired border radius
                      },
                    }}
                    borderColor="primary.200"
                    isChecked={isBackup}
                    colorScheme="primary"
                    onChange={(e) => {
                      setIsBackup(e.target.checked);
                    }}
                  >
                    {" "}
                    <Text color="gray.700" mt={1}>
                      Өдөр болгоны дата Cloud-руу хадгалах
                      <br />
                      Сарын {currencyDisplayHandler(20000, "mn")}
                    </Text>
                  </Checkbox>
                }
                icon={<Icon as={MdHomeWork} />}
              />
              <PricingContent
                list={cloudSercives}
                isEnterprise={true}
                title={"Интернэт сүлжээнд"}
                icon={<Icon as={MdCloudDone} />}
              />
            </Stack>
            <Box w="full">
              {" "}
              <RadioGroup
                defaultValue="2"
                onChange={setPackageVariant}
                value={packageVariant}
              >
                <Radio size="lg" colorScheme="primary" value="0" mr="8">
                  <Text>1-3 кресл(5 компьютер)</Text>
                </Radio>
                <Radio size="lg" colorScheme="primary" value="1" mr={8}>
                  <Text>4-5 кресл(8 компьютер)</Text>
                </Radio>
                <Radio size="lg" colorScheme="primary" value="2">
                  <Text>6-10 кресл(14 компьютер)</Text>
                </Radio>
              </RadioGroup>
            </Box>
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
                }}
                w="full"
                variant={
                  selectEnv == "online" ? "secondary_rounded" : "ghost_rounded"
                }
              >
                Интернэт орчинд
              </Button>
            </HStack>
            <Box>
              <Text
                color="gray.900"
                fontSize={"64px"}
                lineHeight="60px"
                minW={"270px"}
                fontWeight={"700"}
              >
                {currencyDisplayHandler(
                  (selectEnv == "local"
                    ? PriceList[packageVariant as any].price +
                      (isBackup
                        ? PriceList[packageVariant as any].backupPrice
                        : 0)
                    : PriceList[packageVariant as any].cloudPrice) * 1,
                  "mn"
                )}
              </Text>
            </Box>
            <Button onClick={purchase}>
              <Icon as={MdShoppingCart} mr={2} />1 сараар худалдан авах
            </Button>{" "}
            <Box borderTop={"1px "} color="gray.100" pt={4}>
              <Text
                color="gray.900"
                fontSize={"64px"}
                lineHeight="60px"
                minW={"270px"}
                fontWeight={"700"}
              >
                {currencyDisplayHandler(
                  (selectEnv == "local"
                    ? PriceList[packageVariant as any].price +
                      (isBackup
                        ? PriceList[packageVariant as any].backupPrice
                        : 0)
                    : PriceList[packageVariant as any].cloudPrice) * 5.4,
                  "mn"
                )}
              </Text>
              <Flex justifyContent="center" gap={2}>
                <Text color={"gray.600"}>
                  {"  -" +
                    currencyDisplayHandler(
                      (selectEnv == "local"
                        ? PriceList[packageVariant as any].price +
                          (isBackup
                            ? PriceList[packageVariant as any].backupPrice
                            : 0)
                        : PriceList[packageVariant as any].cloudPrice) * 0.6,
                      "mn"
                    ) +
                    " хэмнэлт"}
                </Text>
                <Text color={"red.600"}> -10%</Text>
              </Flex>
            </Box>
            <Button onClick={purchase}>
              <Icon as={MdShoppingCart} mr={2} />6 сараар худалдан авах
            </Button>
            <Box w="full" mt={4}>
              <Flex justifyContent="end" gap={2}>
                <Text color="gray.900">Суурьлуулалтын хураамж:</Text>
                <Text color="orange.600" fontSize={16} fontWeight="bold">
                  100,000₮
                </Text>
              </Flex>
            </Box>
          </VStack>
        </VStack>
      </VStack>
      <Drawer
        isOpen={isQpayOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent borderTopRadius={"8px"} bg="offWhite" minH={"570px"}>
          <DrawerCloseButton />
          <DrawerHeader
            fontSize={"16px"}
            fontWeight="400"
            color="gray.800"
            lineHeight="20px"
            textAlign="center"
          >
            Банкны апп-р төлөх
          </DrawerHeader>
          <DrawerBody>
            {invoiceMutation.isLoading ? (
              <Box w="full" textAlign={"center"}>
                <Spinner size="xl" />
              </Box>
            ) : (
              <>
                <QPayBankChoice qpayUrl={qpayUrl} />
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
const PricingContent = ({
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
const QPayBankChoice = ({ qpayUrl }: { qpayUrl: any[] }) => {
  const openLink = (link: string) => {
    window.open(link);
  };
  return (
    <Grid w="full" templateColumns="repeat(2, 2fr)" gap={3}>
      {qpayUrl.map((url: any, key: any) => {
        return (
          <GridItem w="full" key={key} maxW="180px">
            <Button
              variant={"bankSolid"}
              py={4}
              w="full"
              onClick={() => {
                openLink(url.link);
              }}
              textAlign="left"
              justifyContent={"flex-start"}
            >
              <Image src={url.logo} h={5} w={5} alt="banklogo" mr={2} />
              <Text overflow={"hidden"} textOverflow="ellipsis">
                {url.description}
              </Text>
            </Button>
          </GridItem>
        );
      })}
    </Grid>
  );
};

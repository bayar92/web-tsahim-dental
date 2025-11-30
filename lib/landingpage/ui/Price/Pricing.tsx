import { useAuth } from "@lib/auth/ui";
import { useCreateInvoiceForUser } from "@lib/payment/data/qpayHook";
import { useGetProducts } from "@lib/product/data/productHooks";
import {
  Box,
  Button,
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
  SimpleGrid,
} from "@ui/index";
import { currencyDisplayHandler } from "@util/converters";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdCloudDone, MdHomeWork } from "react-icons/md";
import { PricingContent } from "./PricingContent";

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

const durations = [
  { label: "1 жилийн эрх", value: "12" },
  { label: "6 сарын эрх", value: "6" },
  { label: "3 сарын эрх", value: "3" },
];

const packages = [
  {
    value: "12",
    seats: "1-3",
    license: 5,
    monthlyPrice: 190000,
    totalPrice: 2280000,
  },
  {
    value: "12",
    seats: "4-5",
    license: 8,
    monthlyPrice: 250000,
    totalPrice: 3000000,
  },
  {
    value: "12",
    seats: "6-8",
    license: 14,
    monthlyPrice: 290000,
    totalPrice: 3480000,
  },
  {
    value: "12",
    seats: "9-дээш",
    license: 14,
    monthlyPrice: 350000,
    totalPrice: 4200000,
  },

  {
    value: "6",
    seats: "1-3",
    license: 5,
    monthlyPrice: 220000,
    totalPrice: 1320000,
  },
  {
    value: "6",
    seats: "4-5",
    license: 8,
    monthlyPrice: 280000,
    totalPrice: 1680000,
  },
  {
    value: "6",
    seats: "6-8",
    license: 14,
    monthlyPrice: 320000,
    totalPrice: 1920000,
  },
  {
    value: "6",
    seats: "9-дээш",
    license: 14,
    monthlyPrice: 380000,
    totalPrice: 2280000,
  },

  {
    value: "3",
    seats: "1-3",
    license: 5,
    monthlyPrice: 250000,
    totalPrice: 750000,
  },
  {
    value: "3",
    seats: "4-5",
    license: 8,
    monthlyPrice: 310000,
    totalPrice: 930000,
  },
  {
    value: "3",
    seats: "6-8",
    license: 14,
    monthlyPrice: 350000,
    totalPrice: 1050000,
  },
  {
    value: "3",
    seats: "9-дээш",
    license: 14,
    monthlyPrice: 410000,
    totalPrice: 1230000,
  },
];

export const Pricing = () => {
  const { data: products, isLoading: isLoadingProducts } = useGetProducts();
  const [selectedDuration, setSelectedDuration] = useState("12");
  const { user } = useAuth();

  const btnRef = React.useRef(null);

  const {
    isOpen: isQpayOpen,
    onOpen: onQPayBankChoiceOpen,
    onClose,
  } = useDisclosure();

  const invoiceMutation = useCreateInvoiceForUser();

  const [qpayData, setQpayData] = useState<any>({});

  const createQPayInvoice = async (productVariantId: string) => {
    onQPayBankChoiceOpen();
    invoiceMutation.mutate(
      { productVariantId },
      {
        onSuccess: (data) => {
          setQpayData(data);
        },
      }
    );
  };

  const router = useRouter();
  const openLoginScreen = () => {
    toaster.closeAll();
    router.push({ query: { login: true } });
  };
  const localKey = "Дотоод сүлжээнд";
  const onlineKey = "Интернэт сүлжээнд";

  const purchaseSelectedVariant = async (productVariantId: string) => {
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
            cursor="pointer"
          >
            Нэвтрэх
          </Text>
        </Box>
      );
      return;
    } else createQPayInvoice(productVariantId);
  };

  const filteredPackages = packages.filter(
    (pkg) => pkg.value === selectedDuration
  );

  return (
    <Box
      w={{ base: "95%", md: "90%", lg: "100%" }} // Mobile дээр өргөн болгов
      mx="auto"
      justifyContent="center"
      mt="4"
    >
      <VStack id="pricing" textAlign="center" mx="auto" gap={4} mb={8}>
        <Box
          textAlign="center"
          borderRadius={"30px"}
          p={2}
          px={4}
          bg="gray.100"
          w="fit-content" // Fixed width биш content-оор нь
          mx="auto"
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
        <Heading
          fontSize={{ base: "28px", md: "36px", lg: "36px" }} // Mobile дээр фонт багасгав
          fontWeight="700"
          lineHeight={{ base: "32px", md: "36px", lg: "42px" }}
          width={{ base: "100%", md: "80%", lg: "100%" }} // Mobile width 100%
          mx="auto"
          px={{ base: 2, md: 0 }}
        >
          Танай үйл ажиллагаанд яг тохирсон үнэ
        </Heading>
        <Text
          color="gray.600"
          fontSize={{ base: "14px", md: "18px" }}
          lineHeight={{ base: "20px", md: "24px" }}
          width={{ base: "100%", md: "100%" }} // Mobile width 100%
          mx="auto"
          px={{ base: 4, md: 0 }}
        >
          Хамгийн сайн боломжуудыг агуулсан боломжийн үнийн төлөвлөгөөг сонгоно
          уу.
        </Text>
      </VStack>

      <VStack id="pricing" w="full" textAlign="center" mx="auto" gap={4}>
        {isLoadingProducts ? (
          <Box w="full" textAlign="center">
            <Spinner />
          </Box>
        ) : (
          products &&
          products.length > 0 && (
            <VStack
              mx="auto"
              textAlign="center"
              bg="white"
              w={{ base: "100%", md: "90%", lg: "100%" }}
            >
              <Box
                w="full"
                border="1px solid"
                borderColor="gray.200"
                borderRadius={16}
                p={{ base: 4, md: 6 }} // Mobile padding
              >
                <Stack
                  direction={{ base: "column", lg: "row" }} // MD дээр column байж болно, LG дээр row
                  spacing={{ base: 8, lg: 8 }}
                  w="full"
                  align="flex-start"
                  justify="center"
                >
                  {/* Left Side: PricingContent */}
                  <Box w={{ base: "100%", lg: "100%" }}>
                    {products
                      .filter((r) => r.name === onlineKey)
                      .map((product) => (
                        <PricingContent
                          key={product.name}
                          title={product.name}
                          list={product.productDescription?.items}
                          isEnterprise={product.name === onlineKey}
                          icon={
                            <Icon
                              as={
                                product.name === localKey
                                  ? MdHomeWork
                                  : MdCloudDone
                              }
                            />
                          }
                        />
                      ))}
                  </Box>

                  {/* Right Side: Packages */}
                  <Box w={{ base: "100%", md: "100%" }} mx="auto">
                    <VStack id="pricing" spacing={6}>
                      <RadioGroup
                        onChange={setSelectedDuration}
                        value={selectedDuration}
                        w="100%"
                      >
                        <Stack
                          direction={{ base: "column", sm: "row" }} // Жижиг дэлгэц дээр босоо
                          justify="center"
                          spacing={{ base: 2, sm: 8 }}
                        >
                          {durations.map((d) => (
                            <Radio
                              key={d.value}
                              value={d.value}
                              size="lg"
                              colorScheme="primary"
                            >
                              {d.label}
                            </Radio>
                          ))}
                        </Stack>
                      </RadioGroup>

                      <SimpleGrid
                        columns={{ base: 1, sm: 1, md: 2 }} // Mobile дээр 1 багана
                        spacing={4}
                        w="full"
                      >
                        {filteredPackages.map((pkg) => (
                          <Box
                            key={`${pkg.value}-${pkg.seats}`}
                            p={5}
                            borderWidth="1px"
                            borderRadius="md"
                            bg="white"
                            boxShadow="sm"
                            _hover={{
                              borderColor: "primary.500",
                              shadow: "md",
                            }}
                          >
                            <Flex
                              alignItems="center"
                              justifyContent="space-between"
                              textAlign={{ base: "left", md: "center" }}
                              direction={{ base: "row", md: "row" }}
                              wrap="wrap"
                              gap={2}
                            >
                              <Box w={{ base: "auto", md: "30%" }}>
                                <Text
                                  fontSize={{ base: "18px", md: "20px" }}
                                  fontWeight="semibold"
                                >
                                  {pkg.seats} кресл
                                </Text>
                              </Box>

                              <Box
                                w={{ base: "auto", md: "70%" }}
                                textAlign="right"
                              >
                                <Text
                                  fontSize={{ base: "20px", md: "24px" }}
                                  fontWeight="bold"
                                >
                                  {currencyDisplayHandler(
                                    pkg.monthlyPrice,
                                    "mn"
                                  ).replace(/,/g, "'")}{" "}
                                  <Text
                                    as="span"
                                    fontSize="xs"
                                    color="gray.500"
                                    display="block"
                                    fontWeight="normal"
                                  >
                                    (1 сарын төлбөр)
                                  </Text>
                                </Text>
                                <Text
                                  fontSize="sm"
                                  fontWeight="medium"
                                  color="primary.600"
                                  mt={1}
                                >
                                  Нийт{" "}
                                  {currencyDisplayHandler(
                                    pkg.totalPrice,
                                    "mn"
                                  ).replace(/,/g, "'")}
                                </Text>
                              </Box>
                            </Flex>
                          </Box>
                        ))}
                      </SimpleGrid>

                      {/* Суулгах хураамж */}
                      <Box
                        w="full"
                        mt={6}
                        borderTop="1px dashed"
                        borderColor="gray.200"
                        pt={4}
                      >
                        <Flex
                          justifyContent={{
                            base: "space-between",
                            md: "flex-end",
                          }}
                          gap={{ base: 0, md: 4 }}
                          direction={{ base: "row", md: "row" }}
                          alignItems="center"
                        >
                          <Text color="gray.600" fontSize="sm">
                            1 сарын серверийн зардал:
                          </Text>
                          <Text
                            color="orange.600"
                            fontSize={{ base: "md", md: "lg" }}
                            fontWeight="bold"
                          >
                            29,000₮
                          </Text>
                        </Flex>
                        <Flex
                          justifyContent={{
                            base: "space-between",
                            md: "flex-end",
                          }}
                          gap={{ base: 0, md: 4 }}
                          mt={2}
                          alignItems="center"
                        >
                          <Text color="gray.600" fontSize="sm">
                            Суурьлуулалтын хураамж:
                          </Text>
                          <Text
                            color="orange.600"
                            fontSize={{ base: "md", md: "lg" }}
                            fontWeight="bold"
                          >
                            590,000₮
                          </Text>
                        </Flex>
                      </Box>
                    </VStack>
                  </Box>
                </Stack>
              </Box>
            </VStack>
          )
        )}
      </VStack>

      <Drawer
        isOpen={isQpayOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent borderTopRadius={"8px"} bg="gray.50">
          <DrawerCloseButton />
          <DrawerHeader
            fontSize={"16px"}
            fontWeight="400"
            color="gray.800"
            textAlign="center"
          >
            Банкны апп-р төлөх
          </DrawerHeader>
          <DrawerBody maxW={"640px"} textAlign="center" mx="auto" pb={8}>
            {invoiceMutation.isLoading ? (
              <Box w="full" textAlign={"center"}>
                <Spinner size="xl" />
              </Box>
            ) : (
              <QPayBankChoice qpayData={qpayData} />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

const QPayBankChoice = ({
  qpayData,
}: {
  qpayData: {
    qr_image: string;
    urls: string[];
  };
}) => {
  const openLink = (link: string) => {
    window.open(link);
  };
  return (
    <VStack w="full" maxW="640px" mx="auto" spacing={6}>
      <Box p={4} bg="white" borderRadius="xl">
        <Image
          src={"data:image/png;base64," + qpayData.qr_image}
          alt="qr"
          maxH="200px"
          mx="auto"
        />
      </Box>
      <Grid
        w="full"
        templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }} // Mobile дээр 1 багана
        gap={3}
      >
        {qpayData.urls.map((url: any, key: any) => {
          return (
            <GridItem w="full" key={key}>
              <Button
                variant={"bankSolid"} // Таны theme дээр байгаа байх гэж үзлээ
                py={6}
                w="full"
                onClick={() => {
                  openLink(url.link);
                }}
                textAlign="left"
                justifyContent={"flex-start"}
                bg="white"
                border="1px solid"
                borderColor="gray.200"
                _hover={{ bg: "gray.50" }}
              >
                <Image
                  src={url.logo}
                  h={8}
                  w={8}
                  alt="banklogo"
                  mr={3}
                  borderRadius="md"
                />
                <Text
                  overflow={"hidden"}
                  textOverflow="ellipsis"
                  fontWeight="normal"
                >
                  {url.description}
                </Text>
              </Button>
            </GridItem>
          );
        })}
      </Grid>
    </VStack>
  );
};

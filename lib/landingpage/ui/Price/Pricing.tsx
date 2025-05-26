import { useAuth } from "@lib/auth/ui";
import { useCreateInvoiceForUser } from "@lib/payment/data/qpayHook";
import { useGetProducts } from "@lib/product/data/productHooks";
import {
  Box,
  Button,
  Center,
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
import React, { useState } from "react";
import { MdCloudDone, MdHomeWork, MdShoppingCart } from "react-icons/md";
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

export const Pricing = () => {
  const [packageSits, setPackageSits] = useState<number>(3);
  const { data: products, isLoading: isLoadingProducts } = useGetProducts();
  const { user, isLoggedIn } = useAuth();

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
        //Need to implement error handling when Qpay is down
      }
    );
  };

  const [isBackup, setIsBackup] = useState(false); //local, cloud

  const router = useRouter();
  const openLoginScreen = () => {
    toaster.closeAll();
    //add query login
    router.push({ query: { login: true } });
  };
  const localKey = "Дотоод сүлжээнд";
  const onlineKey = "Интернэт сүлжээнд";
  const [selectEnv, setSelectedEnv] = useState(onlineKey); //local, cloud
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
          >
            Нэвтрэх
          </Text>
        </Box>
      );
      return;
    } else createQPayInvoice(productVariantId);
  };
  return (
    <Box w="full" mx="auto" justifyContent="center"  mt="4">
      <VStack id="pricing" w="full" textAlign="center" mx="auto" gap={4}>
        {isLoadingProducts ? (
          <Box w="full" textAlign="center">
            <Spinner />
          </Box>
        ) : (
          products &&
          products.length > 0 && (
            <VStack mx="auto" textAlign="center" bg="white" maxW={{ base: "100%", md: "1000px" }} w="full">
              <Box
                w="full"
                border="1px solid"
                borderColor="gray.200"
                borderRadius={16}
                p={6}
              >
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={8}
                  w="full"
                  align="flex-start"
                  justify="center"
                >
                  <Box w={{ base: "100%", md: "50%" }}>
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
                  <Box w={{ base: "100%", md: "60%" }}>
                    <RadioGroup
                      onChange={(value) => setPackageSits(parseInt(value))}
                      value={packageSits.toString()}
                    >
                      <HStack spacing={10} justify="center">
                        <Radio size="lg" colorScheme="primary" value="3">
                          <Text>1-3 кресл</Text>
                          <Text>(5 компьютер)</Text>
                        </Radio>
                        <Radio size="lg" colorScheme="primary" value="5">
                          <Text>4-5 кресл</Text>
                          <Text>(8 компьютер)</Text>
                        </Radio>
                        <Radio size="lg" colorScheme="primary" value="10">
                          <Text>6-10 кресл</Text>
                          <Text>(14 компьютер)</Text>
                        </Radio>
                      </HStack>
                    </RadioGroup>

                    <HStack
                      w="full"
                      mt={6}
                      bg="gray.100"
                      h="48px"
                      p={1}
                      borderRadius="24px"
                    >
                      <Button
                        onClick={() => {
                          setSelectedEnv(onlineKey);
                        }}
                        w="full"
                        variant={
                          selectEnv === onlineKey
                            ? "secondary_rounded"
                            : "ghost_rounded"
                        }
                      >
                        {onlineKey}
                      </Button>
                    </HStack>

                    {/* 1 сараар үнэ */}
                    <Box mt={6}>
                      <Text
                        color="gray.900"
                        fontSize="64px"
                        lineHeight="60px"
                        fontWeight="700"
                      >
                        {currencyDisplayHandler(
                          products
                            .filter((p) => p.name === selectEnv)[0]
                            .ProductVariant.filter(
                              (r) => r.sits === packageSits && r.duration === 1
                            )[0].price,
                          "mn"
                        )}
                      </Text>
                    </Box>

                    <Button
                      mt={6}
                      onClick={() =>
                        purchaseSelectedVariant(
                          products
                            .filter((p) => p.name === selectEnv)[0]
                            .ProductVariant.filter(
                              (r) => r.sits === packageSits && r.duration === 1
                            )[0].id
                        )
                      }
                    >
                      <Icon as={MdShoppingCart} mr={2} />1 сараар худалдан авах
                    </Button>
                    {/* 6 сараар үнэ */}
                    <Box borderTop="1px solid #eee" pt={6} mt={6}>
                      <Flex justifyContent="center" gap={6}>
                        <Text color="gray.600">
                          Үндсэн үнэ{" "}
                          {currencyDisplayHandler(
                            products
                              .filter((p) => p.name === selectEnv)[0]
                              .ProductVariant.filter(
                                (r) => r.sits === packageSits && r.duration === 1
                              )[0].price * 6,
                            "mn"
                          )}
                        </Text>
                      </Flex>

                      <Text
                        color="gray.900"
                        fontSize="64px"
                        lineHeight="60px"
                        fontWeight="700"
                      >
                        {currencyDisplayHandler(
                          products
                            .filter((p) => p.name === selectEnv)[0]
                            .ProductVariant.filter(
                              (r) => r.sits === packageSits && r.duration === 6
                            )[0].price,
                          "mn"
                        )}
                      </Text>

                      <Flex justifyContent="center" gap={2}>
                        <Text color="gray.600">
                          -
                          {currencyDisplayHandler(
                            products
                              .filter((p) => p.name === selectEnv)[0]
                              .ProductVariant.filter(
                                (r) => r.sits === packageSits && r.duration === 1
                              )[0].price * 0.6,
                            "mn"
                          )}{" "}
                          хэмнэлт
                        </Text>
                        <Text color="red.600"> -10%</Text>
                      </Flex>
                    </Box>

                    <Button
                      mt={2}
                      onClick={() =>
                        purchaseSelectedVariant(
                          products
                            .filter((p) => p.name === selectEnv)[0]
                            .ProductVariant.filter(
                              (r) => r.sits === packageSits && r.duration === 6
                            )[0].id
                        )
                      }
                    >
                      <Icon as={MdShoppingCart} mr={2} />6 сараар худалдан авах
                    </Button>

                    {/* Суулгах хураамж */}
                    <Box w="full" mt={6}>
                      <Flex justifyContent="end" gap={2}>
                        <Text color="gray.900">Суурьлуулалтын хураамж:</Text>
                        <Text color="orange.600" fontSize={16} fontWeight="bold">
                          290,000₮
                        </Text>
                      </Flex>
                    </Box>
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
            lineHeight="20px"
            textAlign="center"
          >
            Банкны апп-р төлөх
          </DrawerHeader>
          <DrawerBody maxW={"640px"} textAlign="center" mx="auto">
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
    <VStack w="full" maxW="640px" mx="auto" spacing={4}>
      <Box>
        <Image src={"data:image/png;base64," + qpayData.qr_image} alt="qr" />
      </Box>
      <Grid w="full" templateColumns="repeat(2, 2fr)" gap={3}>
        {qpayData.urls.map((url: any, key: any) => {
          return (
            <GridItem w="full" key={key}>
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
    </VStack>
  );
};

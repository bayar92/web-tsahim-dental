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
  SimpleGrid
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
const durations = [
    { label: "1 жилийн эрх", value: "12" },
    { label: "6 сарын эрх", value: "6" },
    { label: "3 сарын эрх", value: "3" },
  ];
  
const packages = [
  { value: "12", seats: 3, license: 5, monthlyPrice: 190000, totalPrice: 2280000 },
  { value: "12", seats: 5, license: 8, monthlyPrice: 250000, totalPrice: 3000000 },
  { value: "12", seats: 10, license: 14, monthlyPrice: 290000, totalPrice: 3480000 },

  { value: "6", seats: 3, license: 5, monthlyPrice: 220000, totalPrice: 1320000 },
  { value: "6", seats: 5, license: 8, monthlyPrice: 280000, totalPrice: 1680000 },
  { value: "6", seats: 10, license: 14, monthlyPrice: 320000, totalPrice: 1920000 },

  { value: "3", seats: 3, license: 5, monthlyPrice: 240000, totalPrice: 720000 },
  { value: "3", seats: 5, license: 8, monthlyPrice: 330000, totalPrice: 990000 },
  { value: "3", seats: 10, license: 14, monthlyPrice: 370000, totalPrice: 1110000 },
];
export const Pricing = () => {
  const [packageSits, setPackageSits] = useState<number>(3);
  const { data: products, isLoading: isLoadingProducts } = useGetProducts();
  const [selectedDuration, setSelectedDuration] = useState("12");
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
  const filteredPackages = packages.filter((pkg) => pkg.value === selectedDuration);

  return (
    <Box w={{ base: "70%", md: "100%", lg: "100%" }} mx="auto" justifyContent="center"  mt="4">
      <VStack id="pricing" w="full" textAlign="center" mx="auto" gap={4}>
        {isLoadingProducts ? (
          <Box w="full" textAlign="center">
            <Spinner />
          </Box>
        ) : (
          products &&
          products.length > 0 && (
            <VStack mx="auto" textAlign="center" bg="white" w={{ base: "50%",  md: "65%",lg: "100%" }}>
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
                  <Box w={{ base: "90%", lg: "100%" }}>
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
                  <Box w={{ base: "100%", md: "100%" }} mx="auto" >
                    <VStack id="pricing">
                      <RadioGroup onChange={setSelectedDuration} value={selectedDuration} mb={4} w="100%" >
                        <HStack justify="center" spacing={8}>
                          {durations.map((d) => (
                            <Radio key={d.value} value={d.value} size="lg" colorScheme="primary">
                              {d.label}
                            </Radio>
                          ))}
                        </HStack>
                      </RadioGroup>

                     <SimpleGrid minChildWidth="250px" spacing={4} w="full">
                        {filteredPackages.map((pkg) => (
                          <Box
                            key={`${pkg.value}-${pkg.seats}`}
                            p={6}
                            borderWidth="1px"
                            borderRadius="md"
                            bg="white"
                            boxShadow="sm"
                          >
                            <Grid display="flex" alignItems="center" textAlign="center" >
                              <Box w="25%">
                                <Text fontSize="20px" fontWeight="semibold">
                                  {pkg.seats} кресл
                                </Text>
                                <Text fontSize="14px" color="gray.500">
                                  ({pkg.license} эрх)
                                </Text>
                              </Box>

                              <Box  w="75%">
                                <Text fontSize="24px" fontWeight="bold">
                                  {currencyDisplayHandler(pkg.monthlyPrice, "mn").replace(/,/g, "'")}{" "}
                                  <Text as="span" fontSize="sm" color="gray.600">
                                    (1 сарын төлбөр)
                                  </Text>
                                </Text>
                                <Text fontSize="sm" fontWeight="medium" color="gray.700">
                                  Нийт {currencyDisplayHandler(pkg.monthlyPrice * 12, "mn").replace(/,/g, "'")}
                                </Text>
                              </Box>
                            </Grid>
                          </Box>
                        ))}
                      </SimpleGrid>
                       {/* Суулгах хураамж */}
                      <Box w="full" mt={6}>
                        <Flex justifyContent="end" gap={2}>
                          <Text color="gray.900">Суурьлуулалтын хураамж:</Text>
                          <Text color="orange.600" fontSize={16} fontWeight="bold">
                            290,000₮
                          </Text>
                        </Flex>
                      </Box>

                    </VStack>

                    <Drawer isOpen={isQpayOpen} placement="bottom" onClose={onClose} finalFocusRef={btnRef}>
                      <DrawerOverlay />
                      <DrawerContent borderTopRadius={"8px"} bg="gray.50">
                        <DrawerCloseButton />
                        <DrawerHeader fontSize={"16px"} fontWeight="400" color="gray.800" textAlign="center">
                          Банкны апп-р төлөх
                        </DrawerHeader>
                        <DrawerBody maxW={"640px"} textAlign="center" mx="auto">
                          {invoiceMutation.isLoading ? (
                            <Box w="full" textAlign="center">
                              <Spinner size="xl" />
                            </Box>
                          ) : (
                            <QPayBankChoice qpayData={qpayData} />
                          )}
                        </DrawerBody>
                      </DrawerContent>
                    </Drawer>
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

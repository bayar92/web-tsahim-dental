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
  const [selectEnv, setSelectedEnv] = useState(localKey); //local, cloud
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
    <>
      <VStack id="pricing" textAlign="center" mx="auto" gap={4}>
        {isLoadingProducts ? (
          <Box w="full" textAlign="center">
            <Spinner />
          </Box>
        ) : (
          products &&
          products.length > 0 && (
            <VStack mx="auto" textAlign="center" bg="white">
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
                  {products
                    .filter((r) => r.name == localKey || r.name == onlineKey)
                    .map((product) => (
                      <PricingContent
                        key={product.name}
                        title={product.name}
                        list={product.productDescription?.items}
                        // bottomComponent={
                        //   product.name === localKey ? (
                        //     <Checkbox
                        //       sx={{
                        //         "& > span:first-of-type": {
                        //           borderRadius: "8px",
                        //         },
                        //       }}
                        //       borderColor="primary.200"
                        //       isChecked={isBackup}
                        //       colorScheme="primary"
                        //       onChange={(e) => {
                        //         setIsBackup(e.target.checked);
                        //       }}
                        //     >
                        //       {" "}
                        //       <Text color="gray.700" mt={1}>
                        //         Өдөр болгоны дата Cloud-руу хадгалах
                        //         <br />
                        //         Сарын {currencyDisplayHandler(20000, "mn")}
                        //       </Text>
                        //     </Checkbox>
                        //   ) : null
                        // }
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
                </Stack>
                <Box w="full">
                  {" "}
                  <RadioGroup
                    defaultValue="2"
                    onChange={(value) => {
                      setPackageSits(parseInt(value));
                    }}
                    value={packageSits.toString()}
                  >
                    <Radio size="lg" colorScheme="primary" value="3" mr="8">
                      <Text>1-3 кресл(5 компьютер)</Text>
                    </Radio>
                    <Radio size="lg" colorScheme="primary" value="5" mr={8}>
                      <Text>4-5 кресл(8 компьютер)</Text>
                    </Radio>
                    <Radio size="lg" colorScheme="primary" value="10">
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
                      setSelectedEnv(localKey);
                    }}
                    variant={
                      selectEnv == localKey
                        ? "secondary_rounded"
                        : "ghost_rounded"
                    }
                  >
                    {localKey}
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedEnv(onlineKey);
                    }}
                    w="full"
                    variant={
                      selectEnv == onlineKey
                        ? "secondary_rounded"
                        : "ghost_rounded"
                    }
                  >
                    {onlineKey}
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
                      products
                        .filter((p) => p.name == selectEnv)[0]
                        .ProductVariant.filter(
                          (r) => r.sits == packageSits && r.duration == 30
                        )[0].price,
                      "mn"
                    )}
                  </Text>
                </Box>
                <Button
                  onClick={() =>
                    purchaseSelectedVariant(
                      products
                        .filter((p) => p.name == selectEnv)[0]
                        .ProductVariant.filter(
                          (r) => r.sits == packageSits && r.duration == 30
                        )[0].id
                    )
                  }
                >
                  <Icon as={MdShoppingCart} mr={2} />1 сараар худалдан авах
                </Button>{" "}
                <Box borderTop={"1px "} color="gray.100" pt={4}>
                  <Flex justifyContent="center" gap={2}>
                    <Text color={"gray.600"}>
                      {"  Үндсэн үнэ " +
                        currencyDisplayHandler(
                          products
                            .filter((p) => p.name == selectEnv)[0]
                            .ProductVariant.filter(
                              (r) => r.sits == packageSits && r.duration == 30
                            )[0].price * 6,
                          "mn"
                        )}
                    </Text>
                  </Flex>
                  <Text
                    color="gray.900"
                    fontSize={"64px"}
                    lineHeight="60px"
                    minW={"270px"}
                    fontWeight={"700"}
                  >
                    {currencyDisplayHandler(
                      products
                        .filter((p) => p.name == selectEnv)[0]
                        .ProductVariant.filter(
                          (r) => r.sits == packageSits && r.duration == 180
                        )[0].price,
                      "mn"
                    )}
                  </Text>
                  <Flex justifyContent="center" gap={2}>
                    <Text color={"gray.600"}>
                      {"  -" +
                        currencyDisplayHandler(
                          products
                            .filter((p) => p.name == selectEnv)[0]
                            .ProductVariant.filter(
                              (r) => r.sits == packageSits && r.duration == 30
                            )[0].price *
                            0.6 * // Cloud price is 60% of base price
                            1,
                          "mn"
                        ) +
                        " хэмнэлт"}
                    </Text>
                    <Text color={"red.600"}> -10%</Text>
                  </Flex>
                </Box>
                <Button
                  onClick={() =>
                    purchaseSelectedVariant(
                      products
                        .filter((p) => p.name == selectEnv)[0]
                        .ProductVariant.filter(
                          (r) => r.sits == packageSits && r.duration == 180
                        )[0].id
                    )
                  }
                >
                  <Icon as={MdShoppingCart} mr={2} />6 сараар худалдан авах
                </Button>
                <Box w="full" mt={4}>
                  <Flex justifyContent="end" gap={2}>
                    <Text color="gray.900">Суурьлуулалтын хураамж:</Text>
                    <Text color="orange.600" fontSize={16} fontWeight="bold">
                      299,000₮
                    </Text>
                  </Flex>
                </Box>
              </VStack>
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
    </>
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

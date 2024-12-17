import {
  Box,
  Image,
  Button,
  Heading,
  HStack,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BsDownload } from "react-icons/bs";
import { CircleAvatar } from "./CircleAvatar";
import { FreeTrialModal } from "./DownloadFreeTrial/FreeTrialModal";
import { WaitModal } from "./Waitlist/WaitModal";

export const HeroSection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [childTabIndex, setChildTabIndex] = useState<number>(0);
  const [selectEnv, setSelectedEnv] = useState<"local" | "online">("local");

  useEffect(() => {}, [selectEnv]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTabIndex(parseInt(event.target.value, 10));
  };

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };
  const handleChildTabsChange = (index: number) => {
    setChildTabIndex(index);
  };

  const content =
    selectEnv === "local" ? (
      <>
        Эмнэлгийн толгой компьютерт өгөгдлийг хадгалах бөгөөд бусад компьютер
        толгой компьютер руу хандан ажиллана. Мөн BACK UP үйлчилгээг авснаар
        дотоод сүлжээнд байгаа өгөгдлийг алдах эрсдлээс сэргийлэн хамгаална.
      </>
    ) : (
      <>
        Програм дээр оруулж буй өгөгдлүүд интернет орчинд хадгалагдах бөгөөд та
        эмнэлгээс гадна орчинд буюу хүссэн газраасаа цаг захиалгын мэдээллийг
        харах боломжтой. Мөн вебээр дамжуулан бусад нэмэлт үйлчилгээг ( таблет
        дээр таниулах зөвшөөрлийн гарын үсгийг зуруулан авах, асуумж бөгөөлэх
        гэх мэт) авах боломжтой байна. Дата өгөгдлүүд нь Монгол доторх серверт
        олон улсын стандарын (ISO) дагуу хадгалагдах болно.
      </>
    );
    const tabStyle = {
      _hover: { bg: "#a5e1f9" },
      _selected: { bg: "#58cbf9" , color: "white" },
      borderRadius: "24px",
      fontSize: "sm",
    };

    const parentTabStyle = {
      _hover: { color: "#069cdf" },
      color: "#58cbf9",
      fontWeight: "800",
      fontSize: "md"
    };
   
  return (
    <>
      <VStack>
        <Box
          width={{ lg: "full" }}
          px={{ base: "6", md: "8", lg: "0" }}
          py={{ base: "6", md: "8", lg: "8" }}
        >
          <VStack textAlign={"center"} spacing={{ base: 4, lg: 4 }}>
            <Box borderRadius={"30px"} p={2} px={4} bg="success.100">
              <Text
                color="success.800"
                fontSize={"14px"}
                lineHeight="20px"
                fontWeight={500}
              >
                Шинэ үеийн шүдний эмнэлэгийн програм
              </Text>
            </Box>
            <Heading
              fontSize={{ base: "32px", lg: "60px" }}
              lineHeight={{ base: 10, lg: "72px" }}
              fontWeight="600"
            >
              Шүдний эмнэлэгийнхээ үйл ажиллагааг бүрэн автоматжуул
            </Heading>
            <VStack mx="auto" textAlign="center" bg="white">
              <Text
                color="gray.800"
                fontSize={"16px"}
                lineHeight="35px"
                fontWeight={500}
              >
                Edental програм нь windows application бөгөөд дараах 2 сүлжээний
                нэгийг сонгон ашиглах боломжтой.
              </Text>
              <HStack w="700px" bg="gray.100" p={1} borderRadius={"24px"}>
                <Button
                  w="full"
                  onClick={() => {
                    setSelectedEnv("local");
                  }}
                  variant={
                    selectEnv == "local" ? "secondary_rounded" : "ghost_rounded"
                  }
                >
                  Дотоот (локал) сүлжээ:
                </Button>
                <Button
                  onClick={() => {
                    setSelectedEnv("online");
                  }}
                  w="full"
                  variant={
                    selectEnv == "online"
                      ? "secondary_rounded"
                      : "ghost_rounded"
                  }
                >
                  Интернэт орчинд
                </Button>
              </HStack>
              <Box>
                <Text
                  p={2}
                  color="gray.600"
                  maxW={"1000px"}
                  fontWeight={400}
                  fontSize={"md"}
                >
                  {content}
                </Text>
              </Box>
            </VStack>
            <Box py={4}>
              <Button onClick={onOpen}>
                <Icon as={BsDownload} mr="2" />
                Туршилтын хувилбар татах
              </Button>
            </Box>
            <Box id="features" position="relative">
              <Tabs
                marginTop={10}
                variant={"topbordered"}
                w="full"
                index={tabIndex}
                onChange={handleTabsChange}
              >
                <TabList
                  position="relative"
                  display="flex"
                  justifyContent="center"
                  width="100%"
                  overflowX="auto"
                  whiteSpace="nowrap"
                  css={{
                    "&::-webkit-scrollbar": { display: "none" },
                  }}
                >
                  <Tab {...parentTabStyle}>Ресепшин</Tab>
                  <Tab {...parentTabStyle}>Цаг захиалга</Tab>
                  <Tab {...parentTabStyle}>Цахим карт</Tab>
                  <Tab {...parentTabStyle}>Зөвлөгөө</Tab>
                  <Tab {...parentTabStyle}>X-ray</Tab>
                  <Tab {...parentTabStyle}>Үйлчлүүлэгч</Tab>
                  <Tab {...parentTabStyle}>Төлбөр</Tab>
                  <Tab {...parentTabStyle}>Касс</Tab>
                  <Tab {...parentTabStyle}>Статистик</Tab>
                  <Tab {...parentTabStyle}>Тохиргоо</Tab>
                </TabList>
                <TabPanels mt="1">
                  <TabPanel>
                    <Tabs index={childTabIndex} onChange={handleChildTabsChange} variant="solid">
                      <TabList display="flex" justifyContent="center" alignItems="center">
                        <Tab
                          {...tabStyle}
                        >
                          Ресепшин1
                        </Tab>
                        <Tab
                          {...tabStyle}
                        >
                          Ресепшин2
                        </Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/reception_1.png" alt="" />
                          <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                            Дэлгэрэнгүй мэдээлэл хэсгээс үйлчлүүлэгчийн бүхий л мэдээллийг харах боломжтой.
                          </Text>
                        </TabPanel>
                        <TabPanel>
                          <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/reception_1.png" alt="" />
                          <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                            Дэл��эрэнгүй мэдээлэл хэсгээс үйлчлүүлэгчийн бүхий л мэдээллийг харах боломжтой.
                          </Text>
                        </TabPanel>
                        <TabPanel>
                          <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/reception_1.png" alt="" />
                          <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                            Дэлгэрэнгүй мэдээлэл хэсгээс үйлчлүүэгчийн бүхий л мэдээллийг харах боломжтой.
                          </Text>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </TabPanel>
                  <TabPanel>
                    <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/tsag_zahialga2.png" alt="" />
                    <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                      Цаг захиалгын хураангуйг эмч тус бүрээр нь харах боломжтой.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Tabs index={childTabIndex} onChange={handleChildTabsChange} variant="solid">
                      <TabList display="flex" justifyContent="center" alignItems="center">
                        <Tab
                          {...tabStyle}
                        >
                          Цахим карт1
                        </Tab>
                        <Tab
                          {...tabStyle}
                        >
                          Цахим карт2
                        </Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/card_2.png" alt="" />
                          <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                            Эмчилгээний төлөвлөгөө харуулах боломжтой.
                          </Text>
                        </TabPanel>
                        <TabPanel>
                          <Text>Цахим карт 2 контент</Text>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </TabPanel>
                  <TabPanel>
                    <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/zuwulguu_2.png" alt="" />
                    <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                      Бэлэн шүд��ий зурган дээр скеч зуран зөвөлгөө өгөх боломжтой.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/xray_2.png" alt="" />
                    <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                      Өөрийн эмнэлэгт хэргэлдэг x-ray програм руу хандан зураг харах боломжтой.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Tabs index={childTabIndex} onChange={handleChildTabsChange} variant="solid">
                      <TabList display="flex" justifyContent="center" alignItems="center">
                        <Tab
                          {...tabStyle}
                        >
                          Үйлчлүүлэгч1
                        </Tab>
                        <Tab
                          {...tabStyle}
                        >
                          Үйлчлүүлэгч2
                        </Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/uilchluulegch_2.png" alt="" />
                          <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                            Үйлчлүүлэгчдээ ухаалгаар хянаж, эмнэлгийн үйл ажиллагаанд доголдол гаргах эрсдэлийг багасгана.
                          </Text>
                        </TabPanel>
                        <TabPanel>
                          <Text>Үйлчлүүлэгч2 контент</Text>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </TabPanel>
                  <TabPanel>
                    <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/payment.png" alt="" />
                    <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                      Төлбөрийн мэдээллийг хялбараар удирдах боломжтой.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/cash.png" alt="" />
                    <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                      Кассын гүйлгээг хянах боломжтой.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/statistics.png" alt="" />
                    <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                      Эмнэлгийн үйл ажиллагааны статистик мэдээллийг харах боломжтой.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Tabs index={childTabIndex} onChange={handleChildTabsChange} variant="solid">
                      <TabList display="flex" justifyContent="center" alignItems="center">
                        <Tab {...tabStyle}>Тохиргоо</Tab>
                        <Tab {...tabStyle}>Тохиргоо</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/settings_2.png" alt="" />
                          <Text
                            marginTop={6}
                            fontWeight={400}
                            fontSize={"md"}
                            color="blackAlpha.900"
                          >
                            Эмчилгээний төрлийг нэмэх, үнийг өөрчлөх боломжтой.
                          </Text>
                          <Text
                            marginTop={2}
                            fontWeight={400}
                            fontSize={"md"}
                            color="blackAlpha.900"
                          >
                            Мөн эмчийн үзлэгийн цаг, амралт зэргийг урьдчилан
                            тохируулснаар ��аг захиалгы илүү хялбар хийх боломжтой.
                          </Text>
                        </TabPanel>
                        <TabPanel>
                          <Text >Тохиргоо</Text>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </VStack>
        </Box>
      </VStack>
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
      </VStack>
      <WaitModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      <FreeTrialModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </>
  );
};

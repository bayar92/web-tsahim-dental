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
  const [selectEnv, setSelectedEnv] = useState<"local" | "online">("online");

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
              fontSize={{ base: "24px", md: "40px", lg: "56px" }}
              lineHeight={{ base: "24px", md: "48px", lg: "56px" }}
              width={{ base: "30%", md: "60%", lg: "100%" }}
              mx="auto"

              fontWeight="600"
            >
              Шүдний эмнэлэгийнхээ үйл ажиллагааг бүрэн автоматжуул
            </Heading>
            <VStack mx="auto" textAlign="center" bg="white">
              <Text
                color="gray.800"
                fontWeight={500}
                fontSize={{ base: "16px", md: "16px", lg: "16px" }}
                lineHeight={{ base: "24px", md: "48px", lg: "48px" }}
                width={{ base: "40%", md: "70%", lg: "100%" }}
                mx="auto"
              >
                Edental програм нь windows application бөгөөд дараах 2 сүлжээний
                нэгийг сонгон ашиглах боломжтой.
              </Text>
              <HStack w={{ base: "30%", sm: "90%", md: "70%", lg: "700px" }}
                bg="gray.100" p={1} borderRadius={"24px"} >
                {/* <Button
                  w="full"
                  onClick={() => {
                    setSelectedEnv("local");
                  }}
                  variant={
                    selectEnv == "local" ? "secondary_rounded" : "ghost_rounded"
                  }
                >
                  Дотоот (локал) сүлжээ:
                </Button> */}
                <Button
                  onClick={() => {
                    setSelectedEnv("online");
                  }}
                  fontSize={{ base: "14px", md: "16px" }}
                  lineHeight={{ base: "20px", md: "24px" }}
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
                  fontSize={{ base: "12px", md: "16px", lg: "16px" }}
                  lineHeight={{ base: "16px", md: "20px", lg: "22px" }}
                  width={{ base: "35%", md: "70%", lg: "90%" }}
                  mx="auto"
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
            <Box id="features" position="relative" >
              <Tabs
                marginTop={6}
                variant={"topbordered"}
                w="full"
                index={tabIndex}
                onChange={handleTabsChange}
              >
                <Box w="full" overflowX="auto">
                <TabList
                  position="relative"
                  display="flex"
                  justifyContent="center"
                  width="100%"
                  overflowX="auto"
                  px={{ base: 2, md: 0 }}
                  whiteSpace="nowrap"
                  css={{
                    "&::-webkit-scrollbar": { display: "none", scrollbarWidth: "none" },
                  }}
                >
                  <Tab minW="fit-content" flexShrink={0} {...parentTabStyle}>Ресепшин</Tab>
                  <Tab minW="fit-content" flexShrink={0} {...parentTabStyle}>Цаг захиалга</Tab>
                  <Tab minW="fit-content" flexShrink={0} {...parentTabStyle}>Цахим карт</Tab>
                  <Tab minW="fit-content" flexShrink={0} {...parentTabStyle}>Зөвлөгөө</Tab>
                  <Tab minW="fit-content" flexShrink={0} {...parentTabStyle}>X-ray</Tab>
                  <Tab minW="fit-content" flexShrink={0} {...parentTabStyle}>Зураг дарах</Tab>
                  <Tab minW="fit-content" flexShrink={0} {...parentTabStyle}>Үйлчлүүлэгч</Tab>
                  <Tab minW="fit-content" flexShrink={0} {...parentTabStyle}>Төлбөр</Tab>
                  <Tab minW="fit-content" flexShrink={0} {...parentTabStyle}>Касс</Tab>
                  <Tab minW="fit-content" flexShrink={0} {...parentTabStyle}>Статистик</Tab>
                  <Tab minW="fit-content" flexShrink={0} {...parentTabStyle}>Тохиргоо</Tab>
                </TabList>
                </Box>
                <TabPanels mt="1">
                  <TabPanel>
                    <Tabs index={childTabIndex} onChange={handleChildTabsChange} variant="solid">
                      <TabList display="flex" justifyContent="center" alignItems="center">
                        <Tab
                          {...tabStyle}
                        >
                          Ресепшин
                        </Tab>
                        {/* <Tab
                          {...tabStyle}
                        >
                          Ресепшин2
                        </Tab> */}
                      </TabList>
                      <TabPanel>
                          <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/reception.jpg" alt="" />
                          <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                            Дэлгэрэнгүй мэдээлэл хэсгээс үйлчлүүлэгчийн бүхий л мэдээллийг харах боломжтой.
                          </Text>
                        </TabPanel>
                    </Tabs>
                  </TabPanel>
                  <TabPanel>
                    <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/booking.jpg" alt="" />
                    <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                      Цаг захиалгын хураангуйг эмч тус бүрээр нь харах боломжтой.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Tabs index={childTabIndex} onChange={handleChildTabsChange} variant="solid">
                      <TabList display="flex" justifyContent="center" alignItems="center">
                        <Tab {...tabStyle} >
                         Анхан үзлэг
                        </Tab>
                        <Tab {...tabStyle} >
                        Эмчилгээ цонх
                        </Tab>
                        {/* <Tab {...tabStyle} >
                          Касс Эмчилгээ тус бүрээр
                        </Tab> */}
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/card_anhan.jpg" alt="" />
                          <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                            Карт Анхан үзлэг цонх
                          </Text>
                        </TabPanel>
                        <TabPanel>
                          <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/card_emchilgee.jpg" alt="" />
                          <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                            Карт Эмчилгээ цонх
                          </Text>
                        </TabPanel>
                        
                      </TabPanels>
                    </Tabs>
                  </TabPanel>
                  <TabPanel>
                    <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/zuvluguu.png" alt="" />
                    <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                      Бэлэн шүд��ий зурган дээр скеч зуран зөвөлгөө өгөх боломжтой.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/xray.png" alt="" />
                    <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                      Өөрийн эмнэлэгт хэргэлдэг x-ray програм руу хандан зураг харах боломжтой.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/picture_pic.jpg" alt="" />
                    <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                      Гар утсаараа зураг дарж дарсан зургаа программ дээрээс харах боломжтой.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/patient.jpg" alt="" />
                    <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                      Үйлчлүүлэгчдээ ухаалгаар хянаж, эмнэлгийн үйл ажиллагаанд доголдол гаргах эрсдэлийг багасгана.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/payment.jpg" alt="" />
                    <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                      Төлбөрийн мэдээллийг хялбараар удирдах боломжтой.
                    </Text>
                  </TabPanel>
                  
                  <TabPanel>
                    <Tabs index={childTabIndex} onChange={handleChildTabsChange} variant="solid">
                      <TabList display="flex" justifyContent="center" alignItems="center">
                        <Tab {...tabStyle} >
                          Касс сараар 
                        </Tab>
                        <Tab {...tabStyle} >
                          Касс Эмч тус бүрээр
                        </Tab>
                        <Tab {...tabStyle} >
                          Касс Эмчилгээ тус бүрээр
                        </Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/cashier.png" alt="" />
                          <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                            Кассын гүйлгээг хянах боломжтой.
                          </Text>
                        </TabPanel>
                        <TabPanel>
                          <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/cashier_doctor.png" alt="" />
                          <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                            Кассын гүйлгээг хянах боломжтой.
                          </Text>
                        </TabPanel>
                        <TabPanel>
                          <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/cashier_treatment.png" alt="" />
                          <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                            Кассын гүйлгээг хянах боломжтой.
                          </Text>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </TabPanel>
                  <TabPanel>
                    <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/statistics-by-day.png" alt="" />
                    <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                      Эмнэлгийн үйл ажиллагааны статистик мэдээллийг харах боломжтой.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Image borderRadius="24px" border="12px solid black" src="/images/screenshot/settings.jpg" alt="" />
                    <Text marginTop={6} fontWeight={400} fontSize="md" color="blackAlpha.900">
                    Эмчилгээний төрлийг нэмэх, үнийг өөрчлөх боломжтой.
                    </Text>
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
        <Heading
          fontSize={{ base: "36px", md: "36px", lg: "36px" }}
          fontWeight="700"
          lineHeight={{ base: "36px", md: "36px", lg: "20px" }}
          width={{ base: "40%", md: "80%", lg: "100%" }}
          mx="auto">
          Танай үйл ажиллагаанд яг тохирсон үнэ
        </Heading>
        <Text color="gray.600"
          fontSize={{ base: "16px", md: "18px" }}
          lineHeight={{ base: "20px", md: "24px"}}
          width={{ base: "50%", md: "100%"}}
          mx="auto">
          Хамгийн сайн боломжуудыг агуулсан боломжийн үнийн төлөвлөгөөг сонгоно
          уу.
        </Text>
      </VStack>
      <WaitModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      <FreeTrialModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </>
  );
};

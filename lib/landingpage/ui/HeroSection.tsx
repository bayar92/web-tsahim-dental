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
  const [tabIndex, setTabIndex] = useState(1);
  const [selectEnv, setSelectedEnv] = useState("local");

  useEffect(() => {}, [selectEnv]);

  const handleSliderChange = (event: any) => {
    setTabIndex(parseInt(event.target.value, 10));
  };

  const handleTabsChange = (index: any) => {
    setTabIndex(index);
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
        дээр таниулах зөвшөөрлийн гарын үсгийг зуруулан авах, асуумж бөглүүлэх
        гэх мэт) авах боломжтой байна. Дата өгөгдлүүд нь Монгол доторх серверт
        олон улсын стандарын (ISO) дагуу хадгалагдах болно.
      </>
    );

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
              {/* <InputGroup size="xl">
                <Input
                  variant={"landingInput"}
                  type={"number"}
                  placeholder="Утасны дугаар"
                />
                <InputRightElement>
                  <Button
                    mt={1}
                    fontSize={"16px"}
                    lineHeight={"24px"}
                    mr={1}
                    h={12}
                    boxShadow="0px 1px 2px rgba(13, 16, 23, 0.06)"
                  >
                    Бүртгүүлэх
                  </Button>
                </InputRightElement>
              </InputGroup> */}
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
                  position="absolute"
                  top={0}
                  left={10}
                  right={0}
                  overflowX="scroll"
                  whiteSpace="nowrap"
                  css={{
                    "&::-webkit-scrollbar": { display: "none" },
                  }}
                >
                  <Tab>Нэвтрэх</Tab>
                  <Tab>Ресепшин</Tab>
                  <Tab>Цаг захиалга</Tab>
                  <Tab>Цахим карт</Tab>
                  <Tab>Зөвлөгөө</Tab>
                  <Tab>X-ray</Tab>
                  <Tab>Үйлчлүүлэгч</Tab>
                  <Tab>Төлбөр</Tab>
                  <Tab>Касс</Tab>
                  <Tab>Статистик</Tab>
                  <Tab>Тохиргоо</Tab>
                </TabList>
                <TabPanels mt="8">
                  <TabPanel>
                    <Image
                      borderRadius={"24px"}
                      border={"12px solid black"}
                      src="/images/screenshot/login.png"
                      alt=""
                    />
                  </TabPanel>
                  <TabPanel>
                    <Image
                      borderRadius={"24px"}
                      border={"12px solid black"}
                      src="/images/screenshot/reception_1.png"
                      alt=""
                    />
                    <Text
                      marginTop={6}
                      fontWeight={400}
                      fontSize={"md"}
                      color="blackAlpha.900"
                    >
                      Дэлгэрэнгүй мэдээлэл хэсгээс үйлчлүүлэгчийн бүхий л
                      мэдээллийг (хамт үйлчлүүлдэг гэр бүлийн хүмүүс, эмнэлэгт
                      ирсэн өдрүүд , эмчилгээнүүдийн хураангуй зэрэг) нэг
                      цонхноос харах боломжтой.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Image
                      borderRadius={"24px"}
                      border={"12px solid black"}
                      src="/images/screenshot/tsag_zahialga2.png"
                      alt=""
                    />
                    <Text
                      marginTop={6}
                      fontWeight={400}
                      fontSize={"md"}
                      color="blackAlpha.900"
                    >
                      Цаг захиалгын хураангуйг (ирц, гүйцэтгэл зэрэг) эмч тус
                      бүрээр нь нэг цонхноос харах боломжтой.
                    </Text>
                    <Text
                      marginTop={2}
                      fontWeight={400}
                      fontSize={"md"}
                      color="blackAlpha.900"
                    >
                      Цаг захиалгыг сануулах автомат мессежийн үйлчилгээ.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Image
                      borderRadius={"24px"}
                      border={"12px solid black"}
                      src="/images/screenshot/card_2.png"
                      alt=""
                    />
                    <Text
                      marginTop={6}
                      fontWeight={400}
                      fontSize={"md"}
                      color="blackAlpha.900"
                    >
                      Эмчилгээний төлөвлөгөө харуулах боломжтой.
                    </Text>
                    <Text
                      marginTop={2}
                      fontWeight={400}
                      fontSize={"md"}
                      color="blackAlpha.900"
                    >
                      Анхан үзлэгийн төлөв, эмчилгээний дараах төлөвийг зурган
                      хэлбэрээр харьцуулан харах боломжтой.
                    </Text>
                    <Text
                      marginTop={2}
                      fontWeight={400}
                      fontSize={"md"}
                      color="blackAlpha.900"
                    >
                      Эмчилгээний бүртгэл хийх үед ажилбарын сонголтууд нэг
                      бүрчлэн гарч ирнэ.{" "}
                    </Text>
                    <Text
                      marginTop={2}
                      fontWeight={400}
                      fontSize={"md"}
                      color="blackAlpha.900"
                    >
                      Сонгосон эмчилгээний дагуу эмчилгээний үнэ автоматаар
                      тооцогдож гарна.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Image
                      borderRadius={"24px"}
                      border={"12px solid black"}
                      src="/images/screenshot/zuwulguu_2.png"
                      alt=""
                    />
                    <Text
                      marginTop={6}
                      fontWeight={400}
                      fontSize={"md"}
                      color="blackAlpha.900"
                    >
                      Бэлэн шүдний зурган дээр скеч зуран зөвөлгөө өгөх
                      боломжтой.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Image
                      borderRadius={"24px"}
                      border={"12px solid black"}
                      src="/images/screenshot/xray_2.png"
                      alt=""
                    />
                    <Text
                      marginTop={6}
                      fontWeight={400}
                      fontSize={"md"}
                      color="blackAlpha.900"
                    >
                      Өөрийн эмнэлэгт хэргэлдэг x-ray програм руу хандан зураг
                      харах боломжтой.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Image
                      borderRadius={"24px"}
                      border={"12px solid black"}
                      src="/images/screenshot/uilchluulegch_2.png"
                      alt=""
                    />
                    <Text
                      marginTop={6}
                      fontWeight={400}
                      fontSize={"md"}
                      color="blackAlpha.900"
                    >
                      Үйлчлүүлэгчдээ ухаалгаар хянаж, эмнэлгийн үйл ажиллагаанд
                      доголдол гаргах эрсдэлийг багасгана.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Image
                      borderRadius={"24px"}
                      border={"12px solid black"}
                      src="/images/screenshot/payment.png"
                      alt=""
                    />
                    <Text
                      marginTop={6}
                      fontWeight={400}
                      fontSize={"md"}
                      color="blackAlpha.900"
                    >
                      Тухайн үйлчлүүлэгчин төлбөрийн түүх үлдэгдэл зэргийг нэг
                      цонхноосо харах болмжтой.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Image
                      borderRadius={"24px"}
                      border={"12px solid black"}
                      src="/images/screenshot/payment.png"
                      alt=""
                    />
                    <Text
                      marginTop={6}
                      fontWeight={400}
                      fontSize={"md"}
                      color="blackAlpha.900"
                    >
                      Хүссэн өдрийн орлогыг харах боломжтой. Эмч тус бүрээр,
                      эмчилгээний төрөл бүрээр орлогыг ангилж харах боломжтой.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Image
                      borderRadius={"24px"}
                      border={"12px solid black"}
                      src="/images/screenshot/statistics-by-day.png"
                      alt=""
                    />
                    <Text
                      marginTop={6}
                      fontWeight={400}
                      fontSize={"md"}
                      color="blackAlpha.900"
                    >
                      Үйлчлүүлэгчдийг шинэ болон давтан үзлэгээр нь, нас болон
                      хүйсээр нь ангилж харах боломжтой.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Image
                      borderRadius={"24px"}
                      border={"12px solid black"}
                      src="/images/screenshot/settings_2.png"
                      alt=""
                    />
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
                      тохируулснаар цаг захиалгыг илүү хялбар хийх боломжтой.
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

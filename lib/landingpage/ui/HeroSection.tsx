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
  IconButton,
  Flex,
} from "@chakra-ui/react";
import type { ImageProps } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BsDownload, BsChevronLeft, BsChevronRight } from "react-icons/bs"; // Сумны icon нэмсэн
import { WaitModal } from "./Waitlist/WaitModal";
import { FreeTrialModal } from "./DownloadFreeTrial/FreeTrialModal";

const TAB_NAMES = [
  "Ресепшин",
  "Цаг захиалга",
  "Анхан үзлэг",
  "Цахим карт",
  "X-ray",
  "Зураг",
  "Төлбөр",
  "Касс",
  "Статистик",
  "Тохиргоо",
];

export const HeroSection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabIndex, setTabIndex] = useState(0);
  const [childTabIndex, setChildTabIndex] = useState(0);
  const [selectEnv, setSelectedEnv] = useState("online");

  useEffect(() => {}, [selectEnv]);

  // Tab солих функц
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const handleChildTabsChange = (index: number) => {
    setChildTabIndex(index);
  };

  // Баруун тийш шилжүүлэх (Next)
  const handleNext = () => {
    setTabIndex((prev) => (prev + 1) % TAB_NAMES.length);
  };

  // Зүүн тийш шилжүүлэх (Prev)
  const handlePrev = () => {
    setTabIndex((prev) => (prev - 1 + TAB_NAMES.length) % TAB_NAMES.length);
  };

  // --- Styles ---
  const tabStyle = {
    _hover: { bg: "#a5e1f9" },
    _selected: { bg: "#58cbf9", color: "white" },
    borderRadius: "24px",
    fontSize: "sm",
    px: 4,
  };

  // Зургийн Responsive загвар
  const responsiveImageProps: ImageProps = {
    w: "full",
    h: "auto",
    borderRadius: { base: "12px", md: "24px" }, // Жижиг дэлгэц дээр бага radius
    borderWidth: { base: "4px", md: "12px" }, // Жижиг дэлгэц дээр нарийн хүрээ
    borderStyle: "solid",
    borderColor: "black",
    objectFit: "contain",
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
        дээр таниулах зөвшөөрлийн гарын үсгийг зуруулан авах, асуумж бөгөөлөх
        гэх мэт) авах боломжтой байна. Дата өгөгдлүүд нь Монгол доторх серверт
        олон улсын стандарын (ISO) дагуу хадгалагдах болно.
      </>
    );

  return (
    <>
      <VStack spacing={{ base: 6, md: 8, lg: 12 }}>
        <Box width="full" px={{ base: "4", md: "8", lg: "16" }}>
          <VStack textAlign={"center"} spacing={{ base: 4, lg: 6 }} w="full">
            {/* ... (Header хэсэг хэвээрээ) ... */}
            <Box borderRadius={"30px"} p={2} px={4} bg="success.100">
              <Text color="success.800" fontSize={"14px"} fontWeight={500}>
                Шинэ үеийн шүдний эмнэлэгийн програм
              </Text>
            </Box>
            <Heading
              fontSize={{ base: "28px", md: "40px", lg: "56px" }}
              lineHeight={{ base: "32px", md: "48px", lg: "56px" }}
              w="full"
              maxW="900px"
              mx="auto"
              fontWeight="600"
            >
              Шүдний эмнэлэгийнхээ үйл ажиллагааг бүрэн автоматжуул
            </Heading>
            <VStack mx="auto" textAlign="center" bg="white" w="full">
              <Text
                color="gray.800"
                fontWeight={500}
                fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                lineHeight={{ base: "24px", md: "30px", lg: "36px" }}
                w="full"
                maxW="900px"
                mx="auto"
              >
                Edental програм нь windows application бөгөөд өгөгдөл клоуд дээр
                хадгалагдана.
              </Text>
              <Box w="full" maxW="900px">
                <Text
                  p={2}
                  color="gray.600"
                  fontSize={{ base: "14px", md: "16px", lg: "16px" }}
                  lineHeight={{ base: "20px", md: "24px", lg: "28px" }}
                  w="full"
                  mx="auto"
                >
                  {content}
                </Text>
              </Box>
            </VStack>
            {/* <Box py={4}>
              <Button onClick={onOpen}>
                <Icon as={BsDownload} mr="2" />
                Туршилтын хувилбар татах
              </Button>
            </Box> */}

            {/* --- FEATURES SECTION --- */}
            <Box id="features" position="relative" w="full">
              {/* 1. MOBILE NAVIGATION (< Ресепшин >) */}
              {/* Энэ хэсэг зөвхөн жижиг дэлгэц дээр (base) харагдана, том (lg) дээр нуугдана */}
              <Flex
                display={{ base: "flex", lg: "none" }}
                justifyContent="space-between"
                alignItems="center"
                bg="gray.50"
                p={2}
                borderRadius="full"
                mb={4}
                boxShadow="sm"
              >
                <IconButton
                  aria-label="Previous tab"
                  icon={<BsChevronLeft />}
                  onClick={handlePrev}
                  variant="ghost"
                  isRound
                  color="#58cbf9"
                />
                <Text fontWeight="bold" fontSize="lg" color="#58cbf9">
                  {TAB_NAMES[tabIndex]}
                </Text>
                <IconButton
                  aria-label="Next tab"
                  icon={<BsChevronRight />}
                  onClick={handleNext}
                  variant="ghost"
                  isRound
                  color="#58cbf9"
                />
              </Flex>

              <Tabs
                marginTop={{ base: 0, lg: 6 }} // Mobile дээр margin хэрэггүй (сумаар удирдана)
                variant={"topbordered"}
                w="full"
                index={tabIndex}
                onChange={handleTabsChange}
                isLazy
              >
                {/* 2. DESKTOP NAVIGATION (List) */}
                {/* Энэ хэсэг зөвхөн том дэлгэц дээр (lg) харагдана, жижиг (base) дээр нуугдана */}
                <Box
                  w="full"
                  overflowX="auto"
                  display={{ base: "none", lg: "block" }}
                >
                  <TabList
                    display="flex"
                    justifyContent="center"
                    borderBottom="none"
                  >
                    {TAB_NAMES.map((name, idx) => (
                      <Tab
                        key={idx}
                        minW="fit-content"
                        _hover={{ color: "#069cdf" }}
                        color="#58cbf9"
                        fontWeight="800"
                        fontSize="md"
                        whiteSpace="nowrap"
                      >
                        {name}
                      </Tab>
                    ))}
                  </TabList>
                </Box>

                <TabPanels mt="1">
                  {/* 1. Ресепшин */}
                  <TabPanel px={0}>
                    <Tabs
                      index={childTabIndex}
                      onChange={handleChildTabsChange}
                      variant="solid"
                      align="center"
                    >
                      <TabList mb={4}>
                        <Tab {...tabStyle}>Ресепшин</Tab>
                      </TabList>
                      <TabPanel p={0}>
                        <Image
                          src="/images/screenshot/reception.png"
                          alt="Ресепшин"
                          {...responsiveImageProps}
                        />
                        <Text mt={4} color="blackAlpha.900">
                          Дэлгэрэнгүй мэдээлэл хэсгээс үйлчлүүлэгчийн бүхий л
                          мэдээллийг харах боломжтой.
                        </Text>
                      </TabPanel>
                    </Tabs>
                  </TabPanel>

                  {/* 2. Цаг захиалга */}
                  <TabPanel px={0}>
                  <Tabs
                      index={childTabIndex}
                      onChange={handleChildTabsChange}
                      variant="solid"
                      align="center"
                    >
                      <TabList mb={4} flexWrap="wrap" justifyContent="center">
                        <Tab {...tabStyle}>Нэг өдрөөр</Tab>
                        <Tab {...tabStyle}>7 хоногоор</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel p={0}>
                          <Image
                            src="/images/screenshot/oneDay.png"
                            alt="Касс"
                            {...responsiveImageProps}
                          />
                        </TabPanel>
                        <TabPanel p={0}>
                          <Image
                            src="/images/screenshot/week.png"
                            alt="Касс"
                            {...responsiveImageProps}
                          />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </TabPanel>

                  <TabPanel px={0}>
                    <Image
                      src="/images/screenshot/anhan.png"
                      alt="Анхан үзлэг"
                      {...responsiveImageProps}
                    />
                    <Text mt={4} color="blackAlpha.900">
                      Цаг захиалгын хураангуйг эмч тус бүрээр нь харах
                      боломжтой.
                    </Text>
                  </TabPanel>


                  {/* 3. Цахим карт */}
                  <TabPanel px={0}>
                    <Tabs
                      index={childTabIndex}
                      onChange={handleChildTabsChange}
                      variant="solid"
                      align="center"
                    >
                      <TabPanel p={0}>
                          <Image
                            src="/images/screenshot/cart.png"
                            alt="Карт Эмчилгээ"
                            {...responsiveImageProps}
                          />
                        </TabPanel>
                    </Tabs>
                  </TabPanel>

                  {/* 5. X-ray */}
                  <TabPanel px={0}>
                    <Image
                      src="/images/screenshot/xray.png"
                      alt="X-ray"
                      {...responsiveImageProps}
                    />
                    <Text mt={4} color="blackAlpha.900">
                      Өөрийн эмнэлэгт хэргэлдэг x-ray програм руу хандан зураг
                      харах боломжтой.
                    </Text>
                  </TabPanel>

                  {/* 6. Зураг дарах */}
                  <TabPanel px={0}>
                    <Image
                      src="/images/screenshot/zurag.png"
                      alt="Зураг дарах"
                      {...responsiveImageProps}
                    />
                    <Text mt={4} color="blackAlpha.900">
                      Гар утсаараа зураг дарж дарсан зургаа программ дээрээс
                      харах боломжтой.
                    </Text>
                  </TabPanel>

                  {/* 8. Төлбөр */}
                  <TabPanel px={0}>
                    <Image
                      src="/images/screenshot/payment.png"
                      alt="Төлбөр"
                      {...responsiveImageProps}
                    />
                    <Text mt={4} color="blackAlpha.900">
                      Төлбөрийн мэдээллийг хялбараар удирдах боломжтой.
                    </Text>
                  </TabPanel>

                  <TabPanel px={0}>
                    <Tabs
                      index={childTabIndex}
                      onChange={handleChildTabsChange}
                      variant="solid"
                      align="center"
                    >
                      <TabList mb={4} flexWrap="wrap" justifyContent="center">
                        <Tab {...tabStyle}>Дэлгэрэнгүй</Tab>
                        <Tab {...tabStyle}>Хураангуй</Tab>
                        <Tab {...tabStyle}>Эмчээр</Tab>
                        <Tab {...tabStyle}>Эмчилгээгээр</Tab>
                        <Tab {...tabStyle}>Үйлчлүүлэгчээр</Tab>
                        <Tab {...tabStyle}>Тооцоо дуусаагүй</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel p={0}>
                          <Image
                            src="/images/screenshot/delgerengui.png"
                            alt="Касс"
                            {...responsiveImageProps}
                          />
                        </TabPanel>
                        <TabPanel p={0}>
                          <Image
                            src="/images/screenshot/huraangui.png"
                            alt="Касс"
                            {...responsiveImageProps}
                          />
                        </TabPanel>
                        <TabPanel p={0}>
                          <Image
                            src="/images/screenshot/emch.png"
                            alt="Касс"
                            {...responsiveImageProps}
                          />
                        </TabPanel>
                        <TabPanel p={0}>
                          <Image
                            src="/images/screenshot/emchilgee.png"
                            alt="Касс"
                            {...responsiveImageProps}
                          />
                        </TabPanel>
                        <TabPanel p={0}>
                          <Image
                            src="/images/screenshot/uilch.png"
                            alt="Касс"
                            {...responsiveImageProps}
                          />
                        </TabPanel>
                        <TabPanel p={0}>
                          <Image
                            src="/images/screenshot/tootsoo.png"
                            alt="Касс"
                            {...responsiveImageProps}
                          />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </TabPanel>

                  {/* 10. Статистик */}
                  <TabPanel px={0}>
                  <Tabs
                      index={childTabIndex}
                      onChange={handleChildTabsChange}
                      variant="solid"
                      align="center"
                    >
                      <TabList mb={4} flexWrap="wrap" justifyContent="center">
                        <Tab {...tabStyle}>Шинэ давтан </Tab>
                        <Tab {...tabStyle}>Нас хүйс</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel p={0}>
                          <Image
                            src="/images/screenshot/shine.png"
                            alt="Касс"
                            {...responsiveImageProps}
                          />
                          <Text mt={4} color="blackAlpha.900">
                            Кассын гүйлгээг хянах боломжтой.
                          </Text>
                        </TabPanel>
                        <TabPanel p={0}>
                          <Image
                            src="/images/screenshot/nas.png"
                            alt="Касс"
                            {...responsiveImageProps}
                          />
                          <Text mt={4} color="blackAlpha.900">
                            Кассын гүйлгээг хянах боломжтой.
                          </Text>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </TabPanel>

                  {/* 11. Тохиргоо */}
                  <TabPanel px={0}>
                  <Tabs
                      index={childTabIndex}
                      onChange={handleChildTabsChange}
                      variant="solid"
                      align="center"
                    >
                      <TabList mb={4} flexWrap="wrap" justifyContent="center">
                        <Tab {...tabStyle}>Эмчилгээний үнэ</Tab>
                        <Tab {...tabStyle}>Эмнэлгийн мэдээлэл</Tab>
                        <Tab {...tabStyle}>Ажилчид</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel p={0}>
                          <Image
                            src="/images/screenshot/torhigoo.png"
                            alt="Касс"
                            {...responsiveImageProps}
                          />
                        </TabPanel>
                        <TabPanel p={0}>
                          <Image
                            src="/images/screenshot/emneleg.png"
                            alt="Касс"
                            {...responsiveImageProps}
                          />
                        </TabPanel>
                        <TabPanel p={0}>
                          <Image
                            src="/images/screenshot/ajilchid.png"
                            alt="Касс"
                            {...responsiveImageProps}
                          />
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

      <WaitModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      <FreeTrialModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </>
  );
};

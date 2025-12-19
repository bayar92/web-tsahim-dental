import React, { useState } from 'react';
import {
  Box, Flex, VStack, Text, Heading, Icon, 
  Accordion, AccordionItem, AccordionButton, 
  AccordionPanel, AccordionIcon
} from '@chakra-ui/react';
import { MdPlayCircle, MdSettings, MdPersonAdd, MdMedicalServices,MdTimelapse, MdPayment, MdMedicalInformation, MdAutoGraph, MdPhotoCamera } from 'react-icons/md';

const menuGroups = [
  {
    title: "Ресепшн, бүртгэл",
    icon: MdPersonAdd,
    items: [
      { id: "r1", title: "Шинэ үйлчлүүлэгч бүртгэх", videoUrl: "/videos/шинэ үйлчлүүлэгч бүртгүүлэх 251219.mp4" },
      { id: "r2", title: "QR уншуулаж шинэ үйлчлүүлэгч бүртгэх", videoUrl: "/videos/утсаар хүн шинээр бүртгэх 251216.mp4" },
      { id: "r3", title: "Үйлчлүүлэгчийн мэдээлэл засах, устгах", videoUrl: "/videos/үйлчлүүлэгчийн мэдээлэл засах, устгах 251219.mp4" },
      { id: "r4", title: "Таниулах зөвшөөрөл бөглөх", videoUrl: "/videos/таниулах зөвшөөрөл бөглөх 251219.mp4" },
      { id: "r4", title: "QR уншуулаж таниулах зөвшөөрөл бөглөх", videoUrl: "/videos/таниулах зөвшөөрөл утсаар авах 251216.mp4" },
      { id: "r6", title: "Лаборатори захиалга", videoUrl: "/videos/lab.mp4" },
      { id: "r7", title: "Эмийн жор гаргах", videoUrl: "/videos/эмийн жор гаргах 251219.mp4" },
    ]
  },
  {
    title: "Цаг захиалга",
    icon: MdTimelapse,
    items: [
      { id: "c1", title: "Цаг тавих төлөв өөрчлөх", videoUrl: "/videos/цаг тавих, төлөв өөрчлөх 251219.mp4" },
    ]
  },
  {
    title: "Үзлэг",
    icon: MdMedicalInformation,
    items: [
      { id: "c2", title: "Анхан үзлэг бүртгэх", videoUrl: "/videos/анхан үзлэг бүртгэх.mp4" },
    ]
  },
  {
    title: "Карт",
    icon: MdMedicalServices,
    items: [
      { id: "c3", title: "Зовуурь бүртгэх", videoUrl: "/videos/зовуурь тэмдэглэж оруулах 251219.mp4" },
      { id: "c4", title: "Эмчилгээний тэмдэглэл хөтлөх", videoUrl: "/videos/эмчилгээ тэмдэглэж оруулах 251219.mp4" },
      { id: "c5", title: "Буруу оруулсан эмчилгээг устгах, төлбөрийг буцаах", videoUrl: "/videos/буруу тэмдэглэсэн эмчилгээг устгах, төлбөрийг буцаах 251219.mp4" },
    ]
  },
  {
    title: "Төлбөр",
    icon: MdPayment,
    items: [
      { id: "p1", title: "Төлбөр авах", videoUrl: "/videos/төлбөр авах 251219.mp4" },
      { id: "p2", title: "Төлбөргүй эмчилгээ хийх үед", videoUrl: "/videos/давтан эмчилгээ, төлбөр авахгүй эмчилгээ хийх үед.mp4" },
      { id: "p3", title: "Нэмэлт бүтээгдэхүүн төлбөр авах үед", videoUrl: "/videos/нэмэлт бүтээгдэхүүн төлбөр авах.mp4" },
    ]
  },
  {
    title: "Касс & Статистик",
    icon: MdAutoGraph,
    items: [
      { id: "p4", title: "Касс, Орлого хянах", videoUrl: "/videos/касс орлого хянах.mp4" },
      { id: "p5", title: "Статистик үзүүлэлтүүд", videoUrl: "/videos/статистик.mp4" },
    ]
  },
  {
    title: "Зураг",
    icon: MdPhotoCamera,
    items: [
      { id: "p6", title: "Зураг оруулах", videoUrl: "/videos/зураг оруулах.mp4" },
    ]
  },
  {
    title: "Тохиргоо",
    icon: MdSettings,
    items: [
      { id: "s1", title: "Эмчилгээ нэмэх, эмчилгээний үнэ өөрчлөх", videoUrl: "/videos/тохиргоо- эмчилгээ нэмэх, эмчилгээний үнэ өөрчлөх.mp4" },
      { id: "s2", title: "Эмнэлгийн мэдээлэл оруулах", videoUrl: "/videos/тохиргоо- эмнэлгийн мэдээлэл оруулах.mp4" },
      { id: "s3", title: "Ажилчин нэмэх", videoUrl: "/videos/тохиргоо- ажилчин нэмэх.mp4" },
    ]
  }
];

export const DirectionsList = () => {
  const [selectedVideo, setSelectedVideo] = useState(menuGroups[0].items[0]);

  return (
    <Flex h="calc(100vh)" bg="gray.50">
      <Box w="350px" bg="#eff8fe" borderRight="1px" borderColor="gray.200" overflowY="auto">
        <Box p={5} borderBottom="1px" borderColor="gray.100">
          <Heading size="md" color="blue.600">Системийн заавар</Heading>
        </Box>

        <Accordion allowToggle defaultIndex={0}>
          {menuGroups.map((group, idx) => (
            <AccordionItem key={idx} border="none">
              <AccordionButton _hover={{ bg: "blue.500" }} py={4}>
                <Icon as={group.icon} mr={3} color="blue.600" />
                <Box flex="1" textAlign="left" fontWeight="bold">
                  {group.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={2} pt={0}>
                <VStack align="stretch" spacing={1}>
                  {group.items.map((item) => (
                    <Flex
                      key={item.id}
                      p={3}
                      pl={8}
                      cursor="pointer"
                      borderRadius="md"
                      bg={selectedVideo.id === item.id ? "blue.200" : "transparent"}
                      color={selectedVideo.id === item.id ? "blue.600" : "gray.600"}
                      _hover={{ bg: "blue.100", color: "blue.500" }}
                      onClick={() => setSelectedVideo(item)}
                      align="center"
                    >
                      <Icon as={MdPlayCircle} mr={2} opacity={selectedVideo.id === item.id ? 1 : 0.5} />
                      <Text fontSize="sm" fontWeight={selectedVideo.id === item.id ? "bold" : "normal"}>
                        {item.title}
                      </Text>
                    </Flex>
                  ))}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>

      <Flex flex={1} justify="center" align="center" p={8} direction="column">
        <Box w="full" maxW="1300px">
          <Box mb={4} border="white" bg="white" borderRadius="2xl" p={4} boxShadow="2xl" >
            <Heading size="lg" mb={2}>{selectedVideo.title}</Heading>
            <Text color="gray.500">Зааварчилгаа видеог тоглуулан үзнэ үү.</Text>
          </Box>
          
          <Box borderRadius="2xl" overflow="hidden" boxShadow="2xl" bg="black" border="4px solid white">
            <video 
              key={selectedVideo.id} 
              controls 
              autoPlay
              style={{ width: '100%', aspectRatio: '16/9' }}
            >
              <source src={selectedVideo.videoUrl} type="video/mp4" />
            </video>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};
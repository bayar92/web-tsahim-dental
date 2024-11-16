import {
  Image,
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  VStack,
} from "@ui/index";

export const Features = () => {
  return (
    <Box
      id="features"
      textAlign={"center"}
      w="full"
      bg="white"
      mt={-14}
      pt="24"
      pb="24"
    >
      <VStack gap={2}>
        <Box borderRadius={"30px"} p={2} px={4} bg="primary.100">
          <Text
            color="primary.800"
            fontSize={"14px"}
            lineHeight="20px"
            fontWeight={500}
          >
            Програмын боломжууд
          </Text>
        </Box>
        <Heading fontSize={"36px"} lineHeight={"44px"} fontWeight="700">
          Шүдний эмнэлэгийн бүх үйлчилгээнд
        </Heading>
        <Text color="gray.600" maxW={"600px"} fontWeight={400} fontSize={"md"}>
          Хэрэглэхэд хялбар байдал, үйлчлүүлэгчийн бүрэн мэдээлэл болон байнгын
          шинэчлэл сайжруулалтыг хүргэх болно.
        </Text>
      </VStack>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={12}
        mt={8}
      >
        <GridItem>
          <VStack gap={2}>
            <Box borderRadius={"12.8px"} w="16" h="16" bg="primary.50">
              <Image m="4" src="/images/shapes1.svg" alt="" />
            </Box>
            <Heading
              fontWeight={"600"}
              fontSize={"20px"}
              lineHeight="30px"
              color="gray.900"
            >
              Боломж #1
            </Heading>
            <Text color="gray.600" fontSize={"16px"} lineHeight="24px">
              Intuitive interface, templates, documentation, and customer
              support for beginners.
            </Text>
          </VStack>
        </GridItem>
        <GridItem>
          {" "}
          <VStack gap={2}>
            <Box borderRadius={"12.8px"} w="16" h="16" bg="primary.50">
              <Image m="4" src="/images/shapes2.svg" alt="" />
            </Box>
            <Heading
              fontWeight={"600"}
              fontSize={"20px"}
              lineHeight="30px"
              color="gray.900"
            >
              Боломж #2
            </Heading>
            <Text color="gray.600" fontSize={"16px"} lineHeight="24px">
              Intuitive interface, templates, documentation, and customer
              support for beginners.
            </Text>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack gap={2}>
            <Box borderRadius={"12.8px"} w="16" h="16" bg="primary.50">
              <Image m="4" src="/images/shapes3.svg" alt="" />
            </Box>
            <Heading
              fontWeight={"600"}
              fontSize={"20px"}
              lineHeight="30px"
              color="gray.900"
            >
              Боломж #3
            </Heading>
            <Text color="gray.600" fontSize={"16px"} lineHeight="24px">
              Intuitive interface, templates, documentation, and customer
              support for beginners.
            </Text>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

import { Box, Heading, HStack, Icon, Stack, Text, VStack } from "@ui/index";
import Link from "next/link";
import { GrMailOption, GrMapLocation, GrPhone } from "react-icons/gr";

export const Contact = () => {
  return (
    <VStack
      id="about-me"
      gap={4}
      w="full"
      bg="white"
      px={{ base: 4, md: 6 }}
      pt="8"
      pb="24"
    >
      {/* TITLE */}
      <Heading
        fontSize={{ base: "24px", md: "36px" }}
        lineHeight={{ base: "28px", md: "40px" }}
        fontWeight="700"
        textAlign="center"
        w="full"
      >
        Холбоо барих
      </Heading>

      {/* SUBTITLE */}
      <Text
        fontSize={{ base: "14px", md: "16px" }}
        lineHeight={{ base: "20px", md: "24px" }}
        textAlign="center"
        maxW="600px"
        color="gray.700"
      >
        Бүтээгдэхүүний талаар асууж тодруулах зүйл байвал мөн хэрэв та бидэнтэй
        холбогдохыг хүсвэл дараах хаягаар холбогдоно уу.
      </Text>

      {/* CONTACT ITEMS */}
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 6, md: 10 }}
        w="full"
        justify="center"
        align="flex-start"
        mt={4}
      >
        {/* EMAIL */}
        <Box w="full" display="flex" alignItems="flex-start" gap={3}>
          <Icon as={GrMailOption} boxSize={6} flexShrink={0} />

          <Box>
            <Heading fontSize={{ base: "14px", md: "16px" }}>
              И-мэйл илгээх
            </Heading>
            <Link href="mailto:head@edental.mn">
              <Text _hover={{ textDecoration: "underline" }}>
                head@edental.mn
              </Text>
            </Link>
          </Box>
        </Box>

        {/* PHONE */}
        <Box w="full" display="flex" alignItems="flex-start" gap={3}>
          <Icon as={GrPhone} boxSize={6} flexShrink={0} />

          <Box>
            <Heading fontSize={{ base: "14px", md: "16px" }}>
              Утсаар холбогдох
            </Heading>
            <Link href="tel:+97680454011">
              <Text _hover={{ textDecoration: "underline" }}>
                +976 80454011
              </Text>
            </Link>
          </Box>
        </Box>

        {/* ADDRESS */}
        <Box w="full" display="flex" alignItems="flex-start" gap={3}>
          <Icon as={GrMapLocation} boxSize={6} flexShrink={0} />

          <Box>
            <Heading fontSize={{ base: "14px", md: "16px" }}>Хаяг</Heading>
            <Link href="https://maps.app.goo.gl/Ckf8ct3o2J41kfdZA">
              <Text _hover={{ textDecoration: "underline" }}>
                Улаанбаатар, Энхтайвны өргөн чөлөө
              </Text>
            </Link>
          </Box>
        </Box>
      </Stack>
    </VStack>
  );
};

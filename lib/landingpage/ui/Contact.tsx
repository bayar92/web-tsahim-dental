import { Box, Heading, HStack, Icon, Stack, Text, VStack } from "@ui/index";
import Link from "next/link";
import { GrMailOption, GrMapLocation, GrPhone } from "react-icons/gr";

export const Contact = () => {
  return (
    <VStack
      id="about-me"
      gap={2}
      w="full"
      bg="white"
      px="4"
      pt="24"
      pb="24"
      flex="1"
    >
      <Heading fontSize={"36px"} fontWeight="700" w="full">
        Холбоо барих
      </Heading>
      <Text w="full">
        Бүтээгдэхүүний талаар асууж тодруулах зүйл байвал мөн хэрэв та бидэнтэй
        холбогдохыг хүсвэл дараах хаягаар холбогдоно уу.
      </Text>
      <Stack w="full" direction={{ base: "column", md: "row" }}>
        <Box w="full" display="flex" alignItems="center" gap="12px">
          <Icon as={GrMailOption} boxSize={6} />
          <Link href="mailto:head@edental.mn">
            <Heading fontSize="">И-мэйл илгээх</Heading>
            <Text _hover={{ textDecoration: "underline" }}>
              head@edental.mn
            </Text>
          </Link>
        </Box>
        <Box w="full" display="flex" alignItems="center" gap="12px">
          <Icon as={GrPhone} boxSize={6} />
          <Link href="tel:+97680454011">
            <Heading fontSize="">Утсаар холбогдох</Heading>
            <Text _hover={{ textDecoration: "underline" }}>+976 80454011</Text>
          </Link>
        </Box>
        <Box w="full" display="flex" alignItems="center" gap="12px">
          <Icon as={GrMapLocation} boxSize={6} />
          <Link href="https://maps.app.goo.gl/Ckf8ct3o2J41kfdZA">
            <Heading fontSize="">Хаяг</Heading>
            <Text _hover={{ textDecoration: "underline" }}>
              Улаанбаатар, Энхтайвны өргөн чөлөө
            </Text>
          </Link>
        </Box>
      </Stack>
    </VStack>
  );
};

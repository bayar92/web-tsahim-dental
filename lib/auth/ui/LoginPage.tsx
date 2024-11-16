import { Box, Flex, HStack, Image } from "@chakra-ui/react";
import { LinkBox } from "@ui/index";
import { LoginScreen } from "./LoginScreen";

export const LoginPage = ({ logoUrl }: { logoUrl: string[] }) => {
  return (
    <Box>
      <Box w="full" textAlign={"center"}>
        <Flex direction={"column"} mt={32}>
          <Flex direction={"row"} mx="auto">
            {logoUrl.map((url, key) => (
              <Image src={url} alt="" h={16} key={key} />
            ))}
          </Flex>
        </Flex>
      </Box>
      <Box
        maxW="420px"
        mx="auto"
        borderRadius={"md"}
        boxShadow={"0px 0px 10px 0px rgba(0, 0, 0, 0.1)"}
      >
        <LoginScreen />
      </Box>
    </Box>
  );
};

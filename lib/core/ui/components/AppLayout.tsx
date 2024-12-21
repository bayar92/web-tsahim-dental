import { getRootUrl } from "@lib/auth/data/types";
import {
  Box,
  Button,
  Flex,
  Footer,
  Heading,
  HStack,
  Image,
  LinkBox,
  LogoUploader,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from "@ui/index";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@lib/auth/ui";
import { TopRightMenu } from "./navigation/TopRightMenu";

export const AppLayout = ({
  title = "",
  bg = "transparent",
  contentWidth = "container.xl",
  hasNavBar = false,
  children,
  canChangeLogo = true,
}: {
  bg?: string;
  title?: string;
  contentWidth?: string;
  hasNavBar?: boolean;
  children?: ReactNode;
  canChangeLogo?: boolean;
}) => {
  const { user, isLoggedIn } = useAuth();
  const [rootUrl, setRootUrl] = useState("/");
  const [currentLogo, setCurrentLogo] = useState(
    user?.hospital?.[0]?.hospitalLogo || "/images/dental-logo.svg"
  );

  useEffect(() => {
    setRootUrl(getRootUrl(user));
  }, [user]);

  const px = useBreakpointValue({ base: 2, md: 6 });
  return (
    <>
      <Flex
        as="header"
        align="center"
        px={px}
        mt={2}
        borderBottomColor={{
          base: useColorModeValue("gray.200", "gray.700"),
          lg: "initial",
        }}
        bg={bg}
      >
        <Flex
          justify="space-between"
          align="center"
          w="full"
          maxW="container.xl"
          mx="auto"
        >
          <VStack align="left">
            <LinkBox href={`${rootUrl}`} box={true} flexShrink={0}>
              <HStack>
                <Image src={currentLogo} alt="" h={12} />
              </HStack>
            </LinkBox>
            <LogoUploader setLogoUrl={setCurrentLogo} />
          </VStack>
          <Flex
            display={{ base: "none", lg: "flex" }}
            w="full"
            pl={20}
            ml={9}
            overflow="hidden"
          >
            <Heading
              variant="main"
              size={"2xl"}
              lineHeight={1.2}
              fontWeight={"200"}
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {title}
            </Heading>
          </Flex>

          <HStack spacing="8">
            <HStack spacing="2"></HStack>
            {isLoggedIn && (
              <HStack spacing="1">
                <TopRightMenu />
              </HStack>
            )}
          </HStack>
        </Flex>
      </Flex>
      <Box
        as="main"
        display="flex"
        px={px}
        backgroundColor={bg}
        flexDirection="column"
      >
        {/* <AdminTopBar /> */}
        <Box maxW={contentWidth} mx="auto" w="full">
          {children}
        </Box>
      </Box>
      <Flex as="footer" backgroundColor={bg} mt="4">
        <Box maxW={contentWidth} mx="auto" w="full">
          <HStack h="full">
            {hasNavBar && (
              <Box display={{ base: "none", lg: "flex" }} width={52} />
            )}
            <Box
              flex="1"
              h="full"
              color={useColorModeValue("gray.200", "gray.800")}
              borderTopWidth="1px"
              borderTopColor={useColorModeValue("gray.200", "gray.800")}
              px={{ base: "6", md: "0" }}
            >
              <Footer />
            </Box>
          </HStack>
        </Box>
      </Flex>
    </>
  );
};

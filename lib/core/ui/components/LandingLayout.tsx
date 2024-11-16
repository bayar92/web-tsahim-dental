import NextLink from "next/link";
import { useAuth } from "@lib/auth/ui";
import { LoginModal } from "@lib/auth/ui/LoginModal";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { ReactNode, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import {
  MdLocalHospital,
  MdLogout,
  MdOutlineHealthAndSafety,
  MdShieldMoon,
} from "react-icons/md";
import { useMobileMenuState } from "./navigation/useMobileMenuState";
import { useRouter } from "next/router";
import { LandingSignUpButton } from "./LandingSignUpButton";
import { useLogout } from "@lib/auth/data/authHooks";

export const LandingLayout = ({ children }: { children?: ReactNode }) => {
  const { t } = useTranslation("app");
  const { user, isLoading, refetch } = useAuth();
  const { isMenuOpen, toggle } = useMobileMenuState();
  const isMobile = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });
  //useDisclosure for LoginModal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const logoutMutation = useLogout();
  useEffect(() => {
    if (router.query?.login) {
      onOpen();
    }
  }, [router, onOpen]);
  const onCloseGlobal = () => {
    router.push("/");
    onClose();
  };
  return (
    <Box px={4}>
      <VStack
        h="full"
        spacing={0}
        mx="auto"
        maxW={{ base: "full", lg: "container.lg" }}
      >
        <Flex width={{ base: "full", lg: "full" }} my={5}>
          <HStack w="full">
            <Image src="/images/dental-logo.svg" h="10" alt="logo" />
            <Image src="/images/dental-text.svg" h="10" alt="logo" />
            <Flex flex="1" justifyContent={"flex-end"}>
              {isMobile ? (
                <Menu>
                  <MenuButton
                    border={0}
                    as={IconButton}
                    aria-label="Options"
                    icon={<FaBars />}
                    variant="outline"
                  />
                  <MenuList>
                    <NextLink href="/">
                      <MenuItem>Нүүр</MenuItem>
                    </NextLink>
                    <NextLink href="#features">
                      <MenuItem>Боломжууд</MenuItem>
                    </NextLink>
                    <NextLink href="#pricing">
                      <MenuItem>Үнэ</MenuItem>
                    </NextLink>
                    <NextLink href="#about-me">
                      <MenuItem>Холбоо барих</MenuItem>
                    </NextLink>
                    <MenuDivider />
                    <MenuItem onClick={onOpen}>Нэвтрэх</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <HStack
                  gap="3"
                  color={"gray.700"}
                  cursor={"pointer"}
                  fontWeight={500}
                  fontSize={"16px"}
                >
                  <NextLink href="/">
                    <Text>Нүүр</Text>
                  </NextLink>
                  <NextLink href="#features">
                    <Text>Боломжууд</Text>
                  </NextLink>
                  <NextLink href="#pricing">
                    <Text>Үнэ</Text>
                  </NextLink>
                  <NextLink href="#about-me">
                    <Text>Холбоо барих</Text>
                  </NextLink>
                  {user ? (
                    <Menu>
                      <MenuButton borderBottom={"1px solid gray"}>
                        <Text fontWeight={"bolder"}>{user.email}</Text>
                      </MenuButton>
                      <MenuList>
                        <NextLink href="/admin">
                          <MenuItem>
                            <Icon as={MdShieldMoon} mr="2" />
                            Админ{" "}
                          </MenuItem>
                        </NextLink>
                        <NextLink href="/hospital">
                          <MenuItem>
                            <Icon as={MdLocalHospital} mr="2" />
                            Эмнэлэг
                          </MenuItem>
                        </NextLink>
                        <NextLink href="/doctor">
                          <MenuItem>
                            <Icon as={MdOutlineHealthAndSafety} mr="2" />
                            Эмч
                          </MenuItem>
                        </NextLink>
                        <MenuDivider />
                        <MenuItem
                          onClick={() =>
                            logoutMutation.mutate(null, {
                              onSuccess: () => {
                                router.push("/");
                              },
                            })
                          }
                        >
                          <Icon as={MdLogout} mr="2" />
                          Гарах
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  ) : (
                    <Box>
                      <Button isLoading={isLoading} onClick={onOpen}>
                        Нэвтрэх
                      </Button>
                      <LandingSignUpButton />
                    </Box>
                  )}
                </HStack>
              )}
            </Flex>
          </HStack>
        </Flex>
        <Box flex="1" h="full" display="flex" flexDirection="column">
          {children}
        </Box>
      </VStack>
      <LoginModal isOpen={isOpen} onClose={onCloseGlobal} onOpen={onOpen} />
    </Box>
  );
};

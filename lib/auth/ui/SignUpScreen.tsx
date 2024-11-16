import {
  Button,
  chakra,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  PinInput,
  PinInputField,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { toaster } from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { HiLockClosed, HiLockOpen, HiOutlinePhone } from "react-icons/hi";
import {
  usePhoneConfirmation,
  usePhoneVerification,
  useSignup,
} from "../data/authHooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { getRootUrl } from "../data/types";
type FormValues = {
  phoneNumber: string;
  pin: string;
  confirmationCode?: string;
  isCodeSent: boolean;
  isConfirmed: boolean;
  fullPhoneNumber?: string;
  password?: string;
  passwordConfirm?: string;
};
const translationPart = "sign-up";

export const SignUpScreen = ({ onClose }: { onClose?: () => void }) => {
  const phoneVerificationMutation = usePhoneVerification();
  const phoneConfirmationMutation = usePhoneConfirmation();
  const signUpMutation = useSignup();
  const { t } = useTranslation("app");
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["phone-code"]);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      isCodeSent: false,
      isConfirmed: false,
    },
  });

  const onPhoneSubmit: SubmitHandler<FormValues> = () => {
    phoneVerificationMutation.mutate(getValues(), {
      onSuccess: (message: any) => {
        console.log(message);
        toaster.success(t(`${translationPart}.code-sent-phone`));
        setValue("isCodeSent", true);
        setValue("fullPhoneNumber", message.fullPhoneNumber);
      },
      onError: (error: any) => {},
    });
  };
  const onPinInputComplete = (pin: string) => {
    setValue("confirmationCode", pin);
    {
      handleSubmit(onCodeSubmit)();
    }
  };
  const onCodeSubmit: SubmitHandler<FormValues> = () => {
    phoneConfirmationMutation.mutate(getValues(), {
      onSuccess: (message: any) => {
        toaster.success(t(`${translationPart}.phone-number-confirmed`));
        setValue("isConfirmed", true);
      },
      onError: (error: any) => {
        toaster.error(t("invalid-code-please-try-again"));
      },
    });
  };
  const onPasswordSubmit: SubmitHandler<FormValues> = () => {
    signUpMutation.mutate(getValues(), {
      onSuccess: (message: any) => {
        toaster.success(t(`${translationPart}.account-created`));
        router.push("/");
        onClose && onClose();
      },
      onError: (error: any) => {
        toaster.error(error.message);
      },
    });
  };

  return (
    <VStack my={4} flex="1" w="full" p={6} alignItems={"flex-start"}>
      <chakra.form w="full">
        <Heading w="full">Бүртгүүлэх</Heading>
        {getValues("isConfirmed") ? (
          <Text>Шинэ нууц үгээ оруулна уу</Text>
        ) : (
          <Text>Утасны дугаараа оруулна уу.</Text>
        )}
        {getValues("isConfirmed") ? (
          <>
            <FormControl id="password" isInvalid={!!errors.password}>
              <FormLabel variant={"normal"}>{t("password")}</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" fontSize={"24px"}>
                  <Icon color="gray.300" as={HiLockClosed} />
                </InputLeftElement>
                <Input
                  pl="10"
                  pb={1}
                  placeholder={"Нууц үг"}
                  type="password"
                  {...register("password", {
                    required: t("validation.password.required"),
                    minLength: {
                      value: 8,
                      message: t("validation.password.min"),
                    },
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              id="passwordConfirm"
              isInvalid={!!errors.passwordConfirm}
            >
              <FormLabel variant={"normal"}>{t("repeat-password")}</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" fontSize={"24px"}>
                  <Icon color="gray.300" as={HiLockClosed} />
                </InputLeftElement>
                <Input
                  pl="10"
                  pb={1}
                  placeholder={"Нууц үг"}
                  type="password"
                  {...register("passwordConfirm", {
                    required: t("validation.password.required"),
                    minLength: {
                      value: 8,
                      message: t("validation.password.min"),
                    },
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.passwordConfirm && errors.passwordConfirm.message}
              </FormErrorMessage>
            </FormControl>
          </>
        ) : (
          <FormControl id="phoneNumber" isInvalid={!!errors.phoneNumber}>
            <FormLabel variant={"normal"}>{t("phone-number")}</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" fontSize={"24px"}>
                <Icon color="gray.300" as={HiOutlinePhone} />
              </InputLeftElement>
              <Input
                pl="10"
                pb={1}
                placeholder="12345678"
                type="text"
                {...register("phoneNumber", {
                  required: t("validation.phone.required"),
                  maxLength: {
                    value: 13,
                    message: t("validation.phone.max"),
                  },
                  minLength: {
                    value: 8,
                    message: t("validation.phone.min"),
                  },
                })}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.phoneNumber && errors.phoneNumber.message}
            </FormErrorMessage>
          </FormControl>
        )}
        <FormErrorMessage>
          {errors.root && errors.root.message}
        </FormErrorMessage>
        {getValues("isCodeSent") && !getValues("isConfirmed") ? (
          <Flex
            flex={1}
            gap={3}
            alignItems={"center"}
            flexWrap={"wrap"}
            flexDir={"column"}
          >
            <Text size={"md"}>
              {t(`${translationPart}.enter-confirmation-code`, {
                phonenumber: getValues("phoneNumber"),
              })}
            </Text>
            <HStack m={"auto"}>
              {phoneConfirmationMutation.isLoading === false && (
                <PinInput
                  size={"sm"}
                  onComplete={(value) => onPinInputComplete(value)}
                >
                  <PinInputField
                    _placeholder={{ color: "primary.500" }}
                    borderColor={"primary.500"}
                  />
                  <PinInputField
                    _placeholder={{ color: "primary.500" }}
                    borderColor={"primary.500"}
                  />
                  <PinInputField
                    _placeholder={{ color: "primary.500" }}
                    borderColor={"primary.500"}
                  />
                  <PinInputField
                    _placeholder={{ color: "primary.500" }}
                    borderColor={"primary.500"}
                  />
                  <PinInputField
                    _placeholder={{ color: "primary.500" }}
                    borderColor={"primary.500"}
                  />
                  <PinInputField
                    _placeholder={{ color: "primary.500" }}
                    borderColor={"primary.500"}
                  />
                </PinInput>
              )}
              {phoneConfirmationMutation.isLoading === true && (
                <Button
                  isLoading={phoneConfirmationMutation.isLoading}
                ></Button>
              )}
            </HStack>
            <Link>({t(`${translationPart}.resend-code`)})</Link>
          </Flex>
        ) : null}
        <Button
          isLoading={phoneVerificationMutation.isLoading}
          onClick={handleSubmit(
            getValues("isConfirmed") ? onPasswordSubmit : onPhoneSubmit
          )}
          type="submit"
          size="md"
          w="full"
          mt="6"
        >
          {getValues("isCodeSent")
            ? t(`${translationPart}.sign-up`)
            : t(`${translationPart}.continue`)}
        </Button>
      </chakra.form>
    </VStack>
  );
};

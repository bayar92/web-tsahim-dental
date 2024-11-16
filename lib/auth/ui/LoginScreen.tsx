import {
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { toaster } from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  BsEnvelope,
  BsEnvelopeFill,
  BsFillEnvelopeXFill,
  BsMailbox,
} from "react-icons/bs";
import { FaEnvelope, FaEnvelopeSquare, FaRegEnvelope } from "react-icons/fa";
import {
  HiLockClosed,
  HiOutlineLockClosed,
  HiOutlineMail,
} from "react-icons/hi";
import { IoMail, IoMailOpenOutline, IoMailOutline } from "react-icons/io5";
import { useLogin } from "../data/authHooks";

//login model type
type LoginModel = {
  email: string;
  password: string;
};

export const LoginScreen = ({ onClose }: { onClose?: () => void }) => {
  const { t } = useTranslation("app");
  const router = useRouter();
  //Login mutation
  const mutation = useLogin();

  //Login action
  const onSubmit = (data: LoginModel) => {
    mutation.mutate(
      { username: data.email.toLowerCase(), password: data.password },
      {
        onError: (e: any) => {
          toaster.error(e.message);
        },
        onSuccess: () => {
          //remove query params "login"
          const { login, ...query } = router.query;
          router.push("/");
          onClose && onClose();
        },
      }
    );
  };
  //Login form
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LoginModel>({});
  return (
    <VStack my={4} flex="1" w="full" p={6} alignItems={"flex-start"}>
      <Heading w="full">Өөрийн эрхээр нэвтрэх</Heading>
      <Text>Нэвтрэх нэр, нууц үгээ оруулна уу.</Text>
      <chakra.form w="full" onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="email" isInvalid={!!errors.email}>
          <FormLabel variant={"normal"}>{t("email")}</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" fontSize={"24px"}>
              <Icon color="gray.300" as={HiOutlineMail} />
            </InputLeftElement>
            <Input
              pl="10"
              pb={1}
              placeholder="name@example.com"
              type="text"
              {...register("email", {
                required: t("validation.email.required"),
              })}
            />
          </InputGroup>

          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="password" isInvalid={!!errors.password}>
          <FormLabel>{t("password")}</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" fontSize={"24px"}>
              <Icon color="gray.300" as={HiOutlineLockClosed} />
            </InputLeftElement>
            <Input
              pl="10"
              pb={1}
              placeholder="••••••••••"
              type="password"
              {...register("password", {
                required: t("validation.password.required"),
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <FormErrorMessage>
          {errors.root && errors.root.message}
        </FormErrorMessage>
        <Button
          isLoading={mutation.isLoading}
          type="submit"
          size="md"
          w="full"
          mt="6"
        >
          {t(`login`)}
        </Button>
      </chakra.form>
    </VStack>
  );
};

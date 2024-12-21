import {
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
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
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import { MdPhone, MdPhoneIphone } from "react-icons/md";
import { useLogin } from "../data/authHooks";

//login model type
type LoginModel = {
  phoneNumber: string;
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
      { username: data.phoneNumber.toLowerCase(), password: data.password },
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
        <FormControl id="phoneNumber" isInvalid={!!errors.phoneNumber}>
          <FormLabel variant={"normal"}>Утасны дугаар</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" fontSize={"24px"}>
              <Icon color="gray.300" as={MdPhoneIphone} />
            </InputLeftElement>
            <Input
              pl="10"
              pb={1}
              placeholder="Утасны дугаар"
              type="text"
              {...register("phoneNumber", {
                required: t("validation.phoneNumber.required"),
              })}
            />
          </InputGroup>

          <FormErrorMessage>
            {errors.phoneNumber && errors.phoneNumber.message}
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

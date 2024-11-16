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
import { useJoinWaitList } from "@lib/landingpage/data/hooks";
import { toaster } from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FaFileDownload } from "react-icons/fa";
import { HiOutlinePhone, HiUser, HiPlus } from "react-icons/hi";

//login model type
type WaitModel = {
  name: string;
  hospitalName: string;
  phoneNumber: string;
};
const onDownload = () => {
  //http://nomadicsoft.net/content/install/dentalsetup.msi
  window.open("http://nomadicsoft.net/content/install/dentalsetup.msi");
};

export const WaitScreen = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation("app");
  const router = useRouter();
  //Login mutation
  const mutation = useJoinWaitList();

  //Login action
  const onSubmit = (data: WaitModel) => {
    console.log(data);
    mutation.mutate(data, {
      onError: (e: any) => {},
      onSuccess: () => {
        onClose();
        toaster.success("Таныг хүлээлгийн жагсаалтанд бүртгэлээ.");
      },
    });
  };
  //Login form
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<WaitModel>({});
  return (
    <VStack my={4} flex="1" w="full" alignItems={"flex-start"}>
      <Heading w="full">Хүлээлгийн жагсаалт</Heading>
      <Text>
        Та утасны дугаараа үлдээж хүлээлгийн жагсаалтанд бүртгүүлнэ үү. Бид
        програм бэлэн болсоны дараа таньд утсаар мэдэгдэнэ.
      </Text>
      <chakra.form w="full" onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="name" isInvalid={!!errors.name}>
          <FormLabel variant={"normal"}>Нэр</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" fontSize={"24px"}>
              <Icon color="gray.300" as={HiUser} />
            </InputLeftElement>
            <Input
              pl="10"
              pb={1}
              fontSize="16px"
              placeholder="Таны нэр"
              {...register("name", {
                required: "Нэр оруулах шаардлагатай",
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="hospitalName" isInvalid={!!errors.hospitalName}>
          <FormLabel variant={"normal"}>Эмнэлгийн нэр</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" fontSize={"24px"}>
              <Icon color="gray.300" as={HiPlus} />
            </InputLeftElement>
            <Input
              pl="10"
              pb={1}
              fontSize="16px"
              placeholder="Эмнэлгийн нэр"
              {...register("hospitalName", {
                required: "Эмнэлгийн нэр оруулах шаардлагатай",
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="phoneNumber" isInvalid={!!errors.phoneNumber}>
          <FormLabel variant={"normal"}>{t("phone-number")}</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" fontSize={"24px"}>
              <Icon color="gray.300" as={HiOutlinePhone} />
            </InputLeftElement>
            <Input
              pl="10"
              pb={1}
              fontSize="16px"
              placeholder="********"
              pattern="[0-9]{8}"
              maxLength={8}
              type="tel"
              {...register("phoneNumber", {
                required: t("validation.phone.required"),
              })}
            />
          </InputGroup>

          <FormErrorMessage>
            {errors.phoneNumber && errors.phoneNumber.message}
          </FormErrorMessage>
        </FormControl>
        <FormErrorMessage>
          {errors.root && errors.root.message}
        </FormErrorMessage>
        {/* <HStack gap={2} mt={8}>
          <Button onClick={onDownload} size="md" w="full">
            <Icon as={FaFileDownload} mr={2} /> Татах
          </Button>
        </HStack> */}

        <HStack gap={2} mt={8}>
          <Button onClick={onClose} variant={"secondary"} size="md" w="full">
            {t(`cancel`)}
          </Button>
          <Button type="submit" size="md" w="full">
            {t(`join-waitlist`)}
          </Button>
        </HStack>
      </chakra.form>
    </VStack>
  );
};

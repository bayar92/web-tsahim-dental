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
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useFreeTrialDownloaderList } from "@lib/landingpage/data/hooks";
import { toaster } from "@ui/index";
import { FaHospital } from "react-icons/fa";
import { GiOfficeChair } from "react-icons/gi";
import { MdAppRegistration } from "react-icons/md";
import { useForm } from "react-hook-form";
import { FaFileDownload } from "react-icons/fa";
import { HiOutlinePhone, HiUser, HiPlus } from "react-icons/hi";

type FreeTrialModel = {
  hospitalName: string;
  phoneNumber: string;
  hospitalChair: string;
  registrationNumber: string;
  directorInfo: string;
};

export const FreeTrialScreen = ({ onClose }: { onClose: () => void }) => {
  const mutation = useFreeTrialDownloaderList();
  const onSubmit = (data: FreeTrialModel) => {
    mutation.mutate(data, {
      onError: (e: any) => {},
      onSuccess: () => {
        onClose();
        window.open("http://nomadicsoft.net/content/install/dentalsetup.msi");
        toaster.success("Баярлалаа.");
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
  } = useForm<FreeTrialModel>({});
  return (
    <VStack my={4} flex="1" w="full" alignItems={"flex-start"}>
      <Heading w="full">Туршилтын хувилбар татах</Heading>
      {/* <Text>
                Та доорх мэдээллийг бөглөнө үү. Бид програм бэлэн болмогц танд утсаар мэдэгдэнэ.
            </Text> */}
      <chakra.form w="full" onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="hospitalName" isInvalid={!!errors.hospitalName}>
          <FormLabel variant={"normal"}>Эмнэлгийн нэр</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" fontSize={"24px"}>
              <Icon color="gray.300" as={FaHospital} />
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
            {errors.hospitalName && errors.hospitalName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="registrationNumber"
          isInvalid={!!errors.registrationNumber}
        >
          <FormLabel variant={"normal"}>
            {"Эмнэлгийн регистрийн дугаар"}
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" fontSize={"24px"}>
              <Icon color="gray.300" as={MdAppRegistration} />
            </InputLeftElement>
            <Input
              pl="10"
              pb={1}
              fontSize="16px"
              placeholder="Регистрийн дугаар"
              pattern="[0-9]*"
              maxLength={12}
              type="tel"
              {...register("registrationNumber", {
                required: "Эмнэлгийн регистрийн дугаар оруулна уу",
              })}
            />
          </InputGroup>

          <FormErrorMessage>
            {errors.registrationNumber && errors.registrationNumber.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="hospitalChair" isInvalid={!!errors.hospitalChair}>
          <FormLabel variant={"normal"}>{"Креслийн тоо"}</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" fontSize={"24px"}>
              <Icon color="gray.300" as={GiOfficeChair} />
            </InputLeftElement>
            <Input
              pl="10"
              pb={1}
              fontSize="16px"
              placeholder="Креслийн тоо"
              pattern="[0-9]{1,2}"
              maxLength={2}
              type="tel"
              {...register("hospitalChair", {
                required: "Креслийн тоо оруулна уу",
              })}
            />
          </InputGroup>

          <FormErrorMessage>
            {errors.hospitalChair && errors.hospitalChair.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="phoneNumber" isInvalid={!!errors.phoneNumber}>
          <FormLabel variant={"normal"}>{"Эмнэлгийн утасны дугаар"}</FormLabel>
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
                required: "Эмнэлгийн утасны дугаар оруулна уу",
              })}
            />
          </InputGroup>

          <FormErrorMessage>
            {errors.phoneNumber && errors.phoneNumber.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="directorInfo" isInvalid={!!errors.directorInfo}>
          <FormLabel variant={"normal"}>{"Захиралын мэдээлэл"}</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" fontSize={"24px"}>
              <Icon color="gray.300" as={HiUser} />
            </InputLeftElement>
            <Textarea
              pl="10"
              pb={1}
              fontSize="16px"
              placeholder="Захиралын нэр, утасны дугаар болон бусад шаардлагатай мэдээлэл"
              {...register("directorInfo", {
                required: "Захиралын мэдээлэл оруулна уу",
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.directorInfo && errors.directorInfo.message}
          </FormErrorMessage>
        </FormControl>
        <FormErrorMessage>
          {errors.root && errors.root.message}
        </FormErrorMessage>
        <HStack gap={2} mt={8}>
          <Button type="submit" size="md" w="full">
            <Icon as={FaFileDownload} mr={2} /> Татах
          </Button>
        </HStack>
      </chakra.form>
    </VStack>
  );
};

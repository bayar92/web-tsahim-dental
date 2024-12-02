import {
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useFreeTrialDownloaderList } from "@lib/landingpage/data/hooks";
import { toaster } from "@ui/index";
import { useForm } from "react-hook-form";
import { FaFileDownload, FaHospital } from "react-icons/fa";
import { GiOfficeChair } from "react-icons/gi";
import { HiOutlinePhone, HiUser } from "react-icons/hi";
import { MdAdd, MdAppRegistration } from "react-icons/md";
import { useCreateHospital } from "../data/hooks";

export type HospitalRegistrationFormType = {
  id?: string;
  name: string;
  phoneNumber: string;
  totalSit: number;
  register: string;
  directorInfo: string;
};

export const HospitalRegistrationForm = ({
  data,
  onClose,
  isTrial = false,
  refetch,
}: {
  data?: HospitalRegistrationFormType;
  onClose?: () => void;
  isTrial?: boolean;
  refetch?: () => void;
}) => {
  console.log(data);
  const mutation = useFreeTrialDownloaderList();
  const createMutation = useCreateHospital();
  const onSubmit = (data: HospitalRegistrationFormType) => {
    if (isTrial) {
      mutation.mutate(data, {
        onError: (e: any) => {},
        onSuccess: () => {
          if (onClose) onClose();
          window.open("http://nomadicsoft.net/content/install/dentalsetup.msi");
          toaster.success("Баярлалаа.");
        },
      });
    } else {
      createMutation.mutate(data, {
        onError: (e: any) => {},
        onSuccess: () => {
          toaster.success("Амжилттай бүртгэгдлээ.");
        },
      });
    }
  };
  //Login form
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<HospitalRegistrationFormType>({
    defaultValues: data,
  });
  return (
    <VStack flex="1" w="full" alignItems={"flex-start"}>
      <chakra.form w="full" onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="hospitalName" isInvalid={!!errors.name}>
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
              {...register("name", {
                required: "Эмнэлгийн нэр оруулах шаардлагатай",
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="registrationNumber" isInvalid={!!errors.register}>
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
              {...register("register", {
                required: "Эмнэлгийн регистрийн дугаар оруулна уу",
              })}
            />
          </InputGroup>

          <FormErrorMessage>
            {errors.register && errors.register.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="hospitalChair" isInvalid={!!errors.totalSit}>
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
              {...register("totalSit", {
                required: "Креслийн тоо оруулна уу",
              })}
            />
          </InputGroup>

          <FormErrorMessage>
            {errors.totalSit && errors.totalSit.message}
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
        <HStack gap={2} mt={4}>
          {isTrial ? (
            <Button type="submit" size="md">
              <Icon as={FaFileDownload} mr={2} /> Татах
            </Button>
          ) : (
            <Button type="submit" size="md">
              <Icon as={MdAdd} mr={2} /> {"Эмнэлэгийн мэдээлэл хадгалах"}
            </Button>
          )}
        </HStack>
      </chakra.form>
    </VStack>
  );
};

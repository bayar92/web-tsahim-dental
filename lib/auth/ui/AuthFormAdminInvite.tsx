import { faker } from "@faker-js/faker";
import { UserRole } from "@prisma/client";
import {
  Box,
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  toaster,
  useColorModeValue,
} from "@ui/index";

import { Select as ReactSelect } from "chakra-react-select";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoArrowDown, IoCallSharp } from "react-icons/io5";

type selectInput = {
  value: any;
  label: string;
};

export type InviteInput = {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber: string;
  role?: UserRole;
  latinName?: string;
  sex?: string;
  dob?: string;
  hospitalId?: string;
};

export const AuthFormAdminInvite = ({
  onComplete,
  role,
}: {
  onComplete: () => void;
  role?: UserRole;
}) => {
  const { t: ta } = useTranslation("auth");
  const { t: to } = useTranslation("common");
  const { t: te } = useTranslation("error");

  const defaultValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    latinName: "",
    role: role || UserRole.USER,
    email: "",
    dob: "",
    sex: "",
  };
  if (process.env.NODE_ENV !== "production") {
    defaultValues.firstName = faker.name.firstName();
    defaultValues.lastName = faker.name.lastName();
    defaultValues.latinName = `${defaultValues.firstName} ${defaultValues.lastName}`;
    defaultValues.phoneNumber = faker.phone.phoneNumber("00000000");
    defaultValues.email = faker.internet.email(
      defaultValues.firstName,
      defaultValues.lastName
    );
  }

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InviteInput>({
    defaultValues: defaultValues,
  });

  const onPhoneSubmit: SubmitHandler<InviteInput> = (authInput) => {
    authInput.role = selectedRole.value;
    if (!authInput.email) authInput.email = undefined;

    if (selectedRole.value === UserRole.USER) {
      if (!authInput.sex)
        return toaster.error(te(`validation.patient.sex.required`));
    } else if (!authInput.email) return toaster.error("Email address required");
    if (authInput.email == "") authInput.email = undefined;
  };

  const roleList: selectInput[] = Object.keys(UserRole).map((r, ii) => ({
    label: ta("role." + r),
    value: r,
  }));

  const sexList: selectInput[] = [
    {
      label: to("sex.male"),
      value: "male",
    },
    {
      label: to("sex.female"),
      value: "female",
    },
  ];
  const [selectedRole, setSelectedRole] = useState(
    roleList.filter((r) => r.value == getValues("role"))[0]
  );

  const [selectedSex, setSelectedSex] = useState({
    label: "",
    value: "",
  });
  return (
    <chakra.form onSubmit={handleSubmit(onPhoneSubmit)}>
      <HStack spacing={8}>
        <FormControl id="role" isInvalid={!!errors.role}>
          <FormLabel>Role</FormLabel>
          <ReactSelect
            placeholder={"Select Role"}
            size={"md"}
            value={selectedRole}
            options={roleList}
            onChange={(bambar: any) => {
              setSelectedRole(bambar);
            }}
          />
          <FormErrorMessage>
            {errors.role && errors.role.message}
          </FormErrorMessage>
        </FormControl>
      </HStack>
      <HStack spacing={8} mt={5}>
        <FormControl id="firstName" isInvalid={!!errors.firstName}>
          <FormLabel>{ta("first-name")}</FormLabel>
          <Input
            type="text"
            {...register("firstName", {
              required: te("validation.first-name.required"),
            })}
          />
          <FormErrorMessage>
            {errors.firstName && errors.firstName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="lastName" isInvalid={!!errors.lastName}>
          <FormLabel>{ta("last-name")}</FormLabel>
          <Input
            type="text"
            {...register("lastName", {
              required: te("validation.last-name.required"),
            })}
          />
          <FormErrorMessage>
            {errors.lastName && errors.lastName.message}
          </FormErrorMessage>
        </FormControl>
      </HStack>

      <HStack mt={5} spacing={8}>
        <FormControl id="phoneNumber" isInvalid={!!errors.phoneNumber}>
          <FormLabel>{ta("phone-number")}</FormLabel>
          <HStack
            position={"relative"}
            border={"1px"}
            borderRadius={"3px"}
            borderColor={"gray.200"}
            backgroundColor={useColorModeValue("gray.100", "gray.850")}
            h={10}
          >
            <Box ml={2}>
              <IoCallSharp />
            </Box>
            <Input
              fontSize={12}
              border={"none"}
              variant={"unstyled"}
              autoComplete="off"
              {...register("phoneNumber", {
                required: "Phone number is required",
                maxLength: {
                  value: 13,
                  message: "Phone number must be less than 13 digit",
                },
                minLength: {
                  value: 8,
                  message: "Phone number must be at least 8 digit",
                },
              })}
              placeholder={"✹✹✹✹✹✹✹✹"}
            />
          </HStack>
          <FormErrorMessage>
            {errors.phoneNumber && errors.phoneNumber.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="email" isInvalid={!!errors.email}>
          <FormLabel>{ta("email-address")}</FormLabel>
          <Input type="email" autoComplete="email" {...register("email", {})} />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
      </HStack>

      <Button
        type="submit"
        size="md"
        w="full"
        mt="5"
        ml="auto"
        fontWeight="700"
      >
        {ta(`sign-up.continue`)}
      </Button>
    </chakra.form>
  );
};

import { UserRole } from "@prisma/client";
import { QueryParamType } from "@ui/hooks/query-param";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  InputRightElement,
  Select,
} from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { BsSearch } from "react-icons/bs";
import { selectInput } from "../data/types";

const countryList: selectInput[] = [{ label: "Mongolia", value: "mn" }];

export const UsersTableActions = ({
  params,
  setParam,
  roles,
}: {
  params: QueryParamType;
  setParam: (key: string, value: string, resetPage?: boolean) => void;
  roles?: UserRole[];
}) => {
  const { t: ta } = useTranslation("auth");
  const roleList = (roles ? roles : Object.keys(UserRole)).map((r) => ({
    label: r,
    value: r,
  }));

  return (
    <Stack
      w="full"
      spacing="2"
      direction={{ base: "column", md: "row" }}
      justify="start"
      borderBottom="1px"
      borderColor="gray.100"
      pb="4"
    >
      <FormControl w="64">
        <InputGroup size="sm">
          <FormLabel srOnly>Утас, нэрээр шүүлт хийх</FormLabel>
          <InputRightElement pointerEvents="none" color="gray.400">
            <BsSearch />
          </InputRightElement>
          <Input
            rounded="base"
            type="search"
            placeholder="Утас, нэрээр шүүлт хийх..."
            pl="4"
            pr="6"
            value={params.text}
            onChange={(e) => setParam("text", e.target.value, true)}
          />
        </InputGroup>
      </FormControl>
      <Select
        w="48"
        size="sm"
        value={params.role}
        onChange={(e) => setParam("role", e.target.value as UserRole, true)}
      >
        <option value="">Бүх эрх</option>
        {roleList.map((role) => (
          <option key={`option-role-${role.value}`} value={role.value}>
            {role.label}
          </option>
        ))}
      </Select>
    </Stack>
  );
};

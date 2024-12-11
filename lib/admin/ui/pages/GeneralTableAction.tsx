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

export const GeneralTableActions = ({
  params,
  setParam,
  roles,
}: {
  params: QueryParamType;
  setParam: (key: string, value: string, resetPage?: boolean) => void;
  roles?: UserRole[];
}) => {
  const { t: ta } = useTranslation("auth");

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
          <FormLabel srOnly>Хай</FormLabel>
          <InputRightElement pointerEvents="none" color="gray.400">
            <BsSearch />
          </InputRightElement>
          <Input
            rounded="base"
            type="search"
            placeholder="Хайх..."
            pl="4"
            pr="6"
            value={params.text}
            onChange={(e) => setParam("text", e.target.value, true)}
          />
        </InputGroup>
      </FormControl>
    </Stack>
  );
};

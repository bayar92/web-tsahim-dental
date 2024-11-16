import { QueryParamType } from "@ui/hooks/query-param";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@ui/index";
import { BsSearch } from "react-icons/bs";

export const WailtListActions = ({
  params,
  setParam,
}: {
  params: QueryParamType;
  setParam: (key: string, value: string, resetPage?: boolean) => void;
}) => {
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
          <FormLabel srOnly>Талбаруудаар хайлт хийх</FormLabel>
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
    </Stack>
  );
};

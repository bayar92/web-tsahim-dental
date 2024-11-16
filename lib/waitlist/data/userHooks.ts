import { useQuery, useMutation } from "react-query";
import { API, Method } from "@util/query";
import { UserRole } from "@prisma/client";
import { QueryParamType } from "@ui/hooks/query-param";

export const useWaitList = (filter: QueryParamType) =>
  useQuery(
    ["waitList", filter.size, filter.page, filter.text],
    API._query(Method.POST, `waitlist`, {}, filter),
    { enabled: !!filter }
  );

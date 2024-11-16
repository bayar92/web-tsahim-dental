import { QueryParamType } from "@ui/hooks/query-param";
import { API, Method } from "@util/query";
import { useQuery } from "react-query";

export const useMessageList = (filter: QueryParamType) =>
  useQuery(
    ["messageList", filter.page, filter.size],
    API._query(Method.GET, `external-service/message`, {}, filter),

    { enabled: !!filter }
  );

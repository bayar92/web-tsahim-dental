import { useQuery } from "react-query";
import { API, Method } from "@util/query";
import { QueryParamType } from "@ui/hooks/query-param";

export const useProductVariantList = (filter: QueryParamType) =>
  useQuery(
    ["productVariantList", filter.size, filter.page, filter.text],
    API.useQueryFn(Method.POST, `product/variants/list`, {}, filter),
    { enabled: !!filter }
  );

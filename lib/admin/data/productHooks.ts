import { useQuery } from "react-query";
import { API, Method } from "@util/query";
import { QueryParamType } from "@ui/hooks/query-param";
export const useProductVariantList = (filter: QueryParamType) =>
  useQuery(
    ["productVariantList", filter.page, filter.size],
    API._query(Method.GET, `product/variantlist`, {}, filter),
    { enabled: !!filter }
  );

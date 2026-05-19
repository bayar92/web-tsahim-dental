import { API, Method } from "@util/query";
import { useQuery } from "react-query";

export const useIpAddressToCountryCode = () =>
  useQuery(
    ["useIpAddressToCountryCode"],
    API.useQueryFn(Method.GET, `ip2location`),
    {}
  );

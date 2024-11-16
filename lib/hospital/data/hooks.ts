import { API, Method } from "@util/query";
import { useQuery } from "react-query";

export const useGetHospitalInfo = (hospitalDomain: string) =>
  useQuery(
    [`refresh`],
    API._query(Method.POST, `hospital/landing/${hospitalDomain}`)
  );

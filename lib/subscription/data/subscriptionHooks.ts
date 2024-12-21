import { useQuery } from "react-query";
import { Method } from "@util/query";
import { API } from "@util/query";
import { QueryParamType } from "@ui/hooks/query-param";

export const useMyHospitalSubscription = () =>
    useQuery([], API._query(Method.GET, `hospital/getmysubscription`),
    );

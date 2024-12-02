import { API, Method } from "@util/query";
import { useMutation, useQuery } from "react-query";

export const useGetHospitalInfo = (hospitalDomain: string) =>
  useQuery(
    [`refresh`],
    API._query(Method.POST, `hospital/landing/${hospitalDomain}`)
  );

export const useGetMyHospital = () =>
  useQuery(`my-hospital`, API._query(Method.POST, `hospital/my-hospital`));

export const useCreateHospital = () =>
  useMutation(API._mutate(Method.POST, `hospital/create`));

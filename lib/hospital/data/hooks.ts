import { API, Method } from "@util/query";
import { useMutation, useQuery } from "react-query";

export const useGetHospitalInfo = (hospitalDomain: string) =>
  useQuery(
    [`refresh`],
    API.useQueryFn(Method.POST, `hospital/landing/${hospitalDomain}`)
  );

  
export const useGetMyHospital = () =>
  useQuery(`my-hospital`, API.useQueryFn(Method.POST, `hospital/my-hospital`));

export const useCreateHospital = () =>
  useMutation(API.useMutateFn(Method.POST, `hospital/create`));

export const useUpdateHospitalLogo = () =>
  useMutation(API.useMutateFn(Method.POST, `hospital/update-logo`));

export const useUploadHospitalPatientPhoto = () =>
  useMutation(API.useMutateFn(Method.POST, `win/patient-photo/save-link`));

export const useGetHospitalPaymentHistory = () =>
  useQuery(
    [`hospital-payment-history`],
    API.useQueryFn(Method.GET, `hospital/get-payment-history`)
  );

export const useGetHospitalMachines = () =>
  useQuery(
    [`hospital-machines`],
    API.useQueryFn(Method.GET, `hospital/get-installed-machine`)
  );

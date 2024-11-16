import { API, Method } from "@util/query";
import { useMutation } from "react-query";

export const useJoinWaitList = () =>
  useMutation(API._auth(Method.POST, `landing/joinwaitlist`, true));

export const useFreeTrialDownloaderList = () =>
  useMutation(API._auth(Method.POST, `landing/freetrial`, true));

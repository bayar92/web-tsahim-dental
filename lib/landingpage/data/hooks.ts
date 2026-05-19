import { API, Method } from "@util/query";
import { useMutation } from "react-query";

export const useJoinWaitList = () =>
  useMutation(API.useAuthMutation(Method.POST, `landing/joinwaitlist`, true));

export const useFreeTrialDownloaderList = () =>
  useMutation(API.useAuthMutation(Method.POST, `landing/freetrial`, true));

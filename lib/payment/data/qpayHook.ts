import { useMutation } from "react-query";
import { API, Method } from "@util/query";

export const useCreateInvoiceForUser = () =>
  useMutation(API._mutate(Method.POST, `payments/qpay/createInvoice`));

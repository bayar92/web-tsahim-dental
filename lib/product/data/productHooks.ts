import { useMutation, useQuery } from "react-query";
import { API, Method } from "@util/query";

export const useGetProductVariants = () =>
    useQuery(['products', 'variants'], () => API._query(Method.GET, `product/variants`));

export const useGetProducts = () =>
    useQuery(['products'], () => API._query(Method.GET, `product`));


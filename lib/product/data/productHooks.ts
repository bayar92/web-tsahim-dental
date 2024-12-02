import { useMutation, useQuery } from "react-query";
import { API, Method } from "@util/query";

type ProductVariant = {
  id: string;
  productId: string;
  name: string;
  price: number;
  unit: number;
  duration: number;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
  sits: number;
};

type ProductDto = {
  id: string;
  name: string;
  productDescription: {
    items: string[];
  };
  createdAt: Date;
  updatedAt: Date;
  ProductVariant: ProductVariant[];
};

export const useGetProducts = () =>
  useQuery<ProductDto[]>(["products"], API._query(Method.GET, `product`, {}));

import axios from "axios";
import { ProductResponse } from "../types/productTypes";

type ProductQueryParams = {
  page: number;
  limit: number;
  name?: string;
  category?: string;
};

export async function fetchProducts(
  page: number = 1,
  limit: number = 3,
  category?: string,
  name = ""
): Promise<ProductResponse> {
  const params: ProductQueryParams = {
    page,
    limit,
  };

  if (name) params.name = name;
  if (category) params.category = category;

  const response = await axios.get<ProductResponse>(
    `http://localhost:3000/product`,
    { params }
  );
  return response.data;
}
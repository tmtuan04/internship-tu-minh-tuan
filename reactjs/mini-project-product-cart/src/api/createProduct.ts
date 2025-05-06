import axios, { AxiosError } from "axios";
import { Products, ProductInput } from "../types/productTypes";

export const createProduct = async (
  data: ProductInput
): Promise<Products> => {
  try {
    const response = await axios.post<{ product: Products }>(
      "http://localhost:3000/admin/products",
      data
    );
    return response.data.product;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    const errorMessage =
      err.response?.data?.message || "Failed to create product";
    throw new Error(errorMessage);
  }
};